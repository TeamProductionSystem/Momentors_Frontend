import axios from "axios";
import { useState, useEffect } from "react";
import MentorCard from "./MentorCard";
// import SessionForm from "./SessionForm";
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
  const [filteredMentors, setFilteredMentors] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState("");
  const [selectedDay, setSelectedDay] = useState("");

  const handleDayChange = (day) => {
    const today = new Date();
    if (day === "Tomorrow") {
      today.setDate(today.getDate() + 1);
    } else if (day === "The Next Day") {
      today.setDate(today.getDate() + 2);
    } else if (day === "Today") {
      // Just leave the date as it is
    }

    const selectedDate = today.toISOString().slice(0, 10);
    setSelectedDay(selectedDate);
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BE_URL}/mentor/`, {
        headers: { Authorization: `Token ${token}` },
      })

      .then((response) => {
        setMentors(response.data);

        const skillsSet = new Set(); // create a new Set to store unique skills
        response.data.forEach((mentor) => {
          if (mentor.skills) {
            mentor.skills.forEach((skill) => {
              skillsSet.add(skill); // add each skill to the Set
            });
          }
        });
        setSkills(Array.from(skillsSet)); // convert Set to array and set as state
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, [token]);

  useEffect(() => {
    if (selectedSkill && selectedDay) {
      const filteredMentors = mentors.filter((mentor) => {
        if (mentor.skills && mentor.skills.includes(selectedSkill)) {
          return mentor.availabilities.some((slot) => {
            const startTime = new Date(slot.start_time)
              .toISOString()
              .slice(0, 10);
            const endTime = new Date(slot.end_time).toISOString().slice(0, 10);
            return startTime <= selectedDay && endTime >= selectedDay;
          });
        }
        return false;
      });
      setFilteredMentors(filteredMentors);
    }
  }, [selectedSkill, selectedDay, mentors]);

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
          </FormControl>
          <Box>
            <Typography variant="h4" marginTop={"2rem"}>
              Select a Day
            </Typography>
            {/* Create three choices, Today, Tomorrow, The Next Day that when selected gives a list of users that have the skill selected and have an open avaliblity on the day they selected */}
            <Stack direction="row" spacing={2} marginTop={"2rem"}>
              <Button variant="text" onClick={() => handleDayChange("Today")}>
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
              Select a Mentor
            </Typography>
            {/* Once a skill and day is selected view a list of mentors that have the skill selected and have an open avaliblity on the day they selected */}
            <Grid container spacing={2} marginTop={"2rem"}>
              {filteredMentors.map((mentor) => (
                <Grid item xs={12} sm={6} md={4} key={mentor.id}>
                  <MentorCard mentor={mentor} token={token} />
                </Grid>
              ))}
            </Grid>
          </Box>
          {/* <SessionForm /> */}
        </Box>
      </Box>
    </Box>
  );
}
