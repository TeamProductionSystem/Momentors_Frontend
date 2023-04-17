import axios from "axios";
import { useState, useEffect } from "react";
import MentorCard from "./MentorCard";
import SessionForm from "./SessionForm";
import {
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Grid,
  Typography,
  Stack,
  Button,
} from "@mui/material";


export default function SessionSignup({ token }) {
  const [skills, setSkills] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState("");
  const [selectedDay, setSelectedDay] = useState("");

  const handleDayChange = () => {
    const today = new Date();

    const selectedDate = today.toISOString().slice(0, 10);
    setSelectedDay(selectedDate);
  };

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
    if (selectedSkill && selectedDay) {
      const filteredMentors = mentors.filter((mentor) => {
        if (
          mentor.mentor_profile &&
          mentor.mentor_profile.skills &&
          mentor.availableSlots.includes(selectedDay)
        ) {
          return mentor.mentor_profile.skills.includes(selectedSkill);
        } else if (mentor.skills && mentor.availableSlots.includes(selectedDay)) {
          return mentor.skills.includes(selectedSkill);
        }
        return false;
      });
      setMentors(filteredMentors);
    }
  }, [selectedSkill, selectedDay, mentors]);

  const handleSkillChange = (event) => {
    setSelectedSkill(event.target.value);
  };

  
  ;

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
                </FormControl>
            <Box>
              <Typography variant="h4" marginTop={"2rem"}>
                Select a Day
              </Typography>
              {/* Create three choices, Today, Tomorrow, The Next Day that when selected gives a list of users that have the skill selected and have an open avaliblity on the day they selected */}
              <Stack direction="row" spacing={2} marginTop={"2rem"}>
                <Button variant="text" onClick={handleDayChange}>
                  Today
                </Button>
                
                <Button
                  variant="text"
                  onClick={() => handleDayChange("Tomorrow")}
                  >
                  Tomorrow
                </Button>
                <Button
                  variant="text"
                  onClick={() => handleDayChange("The Next Day")} 
                  >
                  The Next Day
                </Button>
                
              </Stack>
            </Box>
            <Box>
              <Typography variant="h4" marginTop={"2rem"}>
                Select a Mentor</Typography>
                {/* Once a skill and day is selected view a list of mentors that have the skill selected and have an open avaliblity on the day they selected */}
              <Grid container spacing={2} marginTop={"2rem"}>
                {mentors.map((mentor) => (
                  <Grid item xs={12} sm={6} md={4} key={mentor.id}>
                    <MentorCard mentor={mentor} />
                  </Grid>
                ))}
              </Grid>


              

            </Box>
              <SessionForm/>
        </Box>
      </Box>
    </Box>
  );
}
