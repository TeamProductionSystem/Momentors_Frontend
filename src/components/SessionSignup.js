import axios from "axios";
import { useState, useEffect } from "react";
import MentorCard from "./MentorCard";
import {
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Grid,
  Typography,
  Stack,
} from "@mui/material";

export default function SessionSignup({ token }) {
  const [skills, setSkills] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState("");
  const [selectedDay, setSelectedDay] = useState("");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BE_URL}/mentor/`, {
        headers: { Authorization: `Token ${token}` },
      })

      .then((response) => {
        console.log(response.data);

        const mentorsWithAvailableSlots = response.data.map((mentor) => {
          let availableSlots = [];
          if (mentor.availablities) {
            availableSlots = mentor.availablities;
          }
          return {
            ...mentor,
            availableSlots,
          };
        });

        setMentors(mentorsWithAvailableSlots);

        const skillsSet = new Set(); // create a new Set to store unique skills
        response.data.forEach((mentor) => {
          if (mentor.mentor_profile && mentor.mentor_profile.skills) {
            const mentorSkills = Array.isArray(mentor.mentor_profile.skills)
              ? mentor.mentor_profile.skills
              : [mentor.mentor_profile.skills];
            mentorSkills.forEach((skill) => {
              skillsSet.add(skill); // add each skill to the Set
            });
          } else if (mentor.skills) {
            const mentorSkills = Array.isArray(mentor.skills)
              ? mentor.skills
              : [mentor.skills];
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
        .get(`${process.env.REACT_APP_BE_URL}/mentor/${selectedSkill}`, {
          headers: { Authorization: `Token ${token}` },
        })

        .then((response) => {
          const filteredMentors = response.data.filter((mentor) => {
            if (mentor.mentor_profile && mentor.mentor_profile.skills) {
              return mentor.mentor_profile.skills.includes(selectedSkill);
            } else if (mentor.skills) {
              return mentor.skills.includes(selectedSkill);
            }
            return false;
          });
          setMentors(filteredMentors);
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
    <Box className="SessionRequest">
      <Box className="SessionRequest-Header">
        <Typography
          variant="h4"
          textAlign={"center"}
          marginTop={"2rem"}
          sx={{ textDecoration: "underline" }}
        >
          Mentor Sessions
        </Typography>
        <Box>
          <FormControl sx={{ minWidth: 140, marginTop: "2rem" }}>
            <InputLabel id="skills">Select A Topic</InputLabel>
            <Select
              labelId="skills"
              label="Select A Topic"
              value={selectedSkill}
              onChange={handleSkillChange}
            >
              {skills.map((skill) => (
                <MenuItem key={skill} value={skill}>
                  {skill}
                </MenuItem>
              ))}
            </Select>
            <Box>
              <Typography variant="h4" marginTop={"2rem"}>
                Select a Day
              </Typography>
              {/* Create three choices, Today, Tomorrow, The Next Day that when selected gives a list of users that have the skill selected and have an open avaliblity on the day they selected */}
            </Box>
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
}
