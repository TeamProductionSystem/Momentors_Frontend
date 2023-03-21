import { Divider } from "@chakra-ui/react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Select, Box, Grid, GridItem } from "@chakra-ui/react";

export default function SessionSignup({ token }) {
  const [skills, setSkills] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState("");

  useEffect(() => {
    axios
      .get("https://team-production-system.onrender.com/mentor/", {
        headers: { Authorization: `Token ${token}` },
      })
      .then((response) => {
        const skillsSet = new Set(); // create a new Set to store unique skills
        response.data.forEach((mentor) => {
          if (mentor.mentor_profile && mentor.mentor_profile.skills) {
            const mentorSkills = Array.isArray(mentor.mentor_profile.skills)
              ? mentor.mentor_profile.skills
              : [mentor.mentor_profile.skills];
            mentorSkills.forEach((skill) => {
              skillsSet.add(skill); // add each skill to the Set
            });
          }
        });
        setSkills(Array.from(skillsSet)); // convert Set to array and set as state
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  useEffect(() => {
    if (selectedSkill) {
      axios
        .get(
          `https://team-production-system.onrender.com/mentor/${selectedSkill}`,
          {
            headers: { Authorization: `Token ${token}` },
          }
        )

        .then((response) => {
          setMentors(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [selectedSkill, token]);

  const handleSkillChange = (event) => {
    setSelectedSkill(event.target.value);
  };

  return (
    skills && (
      <div className='session--signup'>
        <div className='session--signup-header'>Meet a Mentor</div>
        <div className='session--signup-topic'>
          <p>What do you want to learn about?</p>
          <Select placeholder='Select Skill' onChange={handleSkillChange}>
            {skills.map((skill) => (
              <option value={skill} key={skill}>
                {skill}
              </option>
            ))}
          </Select>
        </div>
        {mentors.length > 0 && selectedSkill && (
          <div className='session--signup-mentors'>
            <p>Choose a Mentor!:</p>

            <Grid templateColumns='repeat(3, 1fr)' gap={4}>
              {mentors.map((mentor) => (
                <GridItem>
                  <Box key={mentor.pk} bg='tomato' height='175px'>
                    {mentor.about_me}
                  </Box>
                </GridItem>
              ))}
            </Grid>
          </div>
        )}
      </div>
    )
  );
}
