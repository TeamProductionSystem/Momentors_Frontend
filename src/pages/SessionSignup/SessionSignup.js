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
  const [timeBlock, setTimeBlock] = useState(30);

  const handleTimeBlockChange = (event) => {
    setTimeBlock(event.target.value);
  };

  const getTimeBlocks = (start, end, blockLength) => {
    const startTime = start instanceof Date ? start : new Date(start);
  const endTime = end instanceof Date ? end : new Date(end);
    const timeBlocks = [];

    while (startTime < endTime) {
      const blockEnd = new Date(startTime.getTime() + blockLength * 60000);

      if (blockEnd > endTime) {
        break;
      }

      timeBlocks.push({
        start: new Date(startTime),
        end: blockEnd,
      });

      startTime.setTime(blockEnd.getTime());
    }

    return timeBlocks;
  };

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
      const filteredMentors = mentors
        .map((mentor) => {
          const copyMentor = { ...mentor };
          if (copyMentor.availabilities) {
            copyMentor.availabilities = copyMentor.availabilities.flatMap(
              (slot) => {
                const start = new Date(slot.start_time);
                const end = new Date(slot.end_time);
                const selected = new Date(selectedDay);

                const startDay = new Date(
                  start.getFullYear(),
                  start.getMonth(),
                  start.getDate()
                );
                const endDay = new Date(
                  end.getFullYear(),
                  end.getMonth(),
                  end.getDate()
                );
                const selectedDayOnly = new Date(
                  selected.getFullYear(),
                  selected.getMonth(),
                  selected.getDate()
                );

                // Check if selected day is in the range of the slot's start and end days
                if (selectedDayOnly >= startDay && selectedDayOnly <= endDay) {
                  const blockStartTime =
                    selectedDayOnly > startDay ? selected : start;
                  const blockEndTime =
                    selectedDayOnly < endDay
                      ? new Date(
                          selected.getFullYear(),
                          selected.getMonth(),
                          selected.getDate(),
                          23,
                          59,
                          59
                        )
                      : end;
                  return getTimeBlocks(blockStartTime, blockEndTime, timeBlock);
                }

                return [];
              }
            );
          } else {
            copyMentor.availabilities = [];
          }
          if (copyMentor.availabilities.length > 0) {
            return copyMentor;
          }

          return null;
        })
        .filter(Boolean);
      setFilteredMentors(filteredMentors);
    }
  }, [selectedSkill, selectedDay, mentors, timeBlock]);

  const handleSkillChange = (event) => {
    setSelectedSkill(event.target.value);
  };


    function handleSubmitSession(){
      
    }
  return (
    <Box className="SessionRequest">
      <Box className="SessionRequest-Header">
        <Typography
          variant="h4"
          textAlign={"center"}
          marginTop={"2rem"}
          sx={{ textDecoration: "underline" }}
        >
          Sessions Signup
        </Typography>
        <Box textAlign={"center"}>
          <FormControl sx={{ minWidth: 140, marginTop: "2rem"}}>
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
            <Stack
              direction="row"
              spacing={2}
              marginTop={"2rem"}
              justifyContent={"center"}
            >
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
          <FormControl sx={{ minWidth: 140, marginTop: "2rem" }}>
            <InputLabel id="time-block">Select Time Block</InputLabel>
            <Select
              labelId="time-block"
              label="Select Time Block"
              value={timeBlock}
              onChange={handleTimeBlockChange}
            >
              <MenuItem value={30}>30 minutes</MenuItem>
              <MenuItem value={60}>60 minutes</MenuItem>
            </Select>
          </FormControl>
          <Box>
            <Typography variant="h4" marginTop={"2rem"}>
              Select a Mentor
            </Typography>
            {/* Once a skill and day is selected view a list of mentors that have the skill selected and have an open avaliblity on the day they selected */}
            <Grid
              container
              spacing={2}
              marginTop={"2rem"}
              justifyContent={"center"}
            >
              {filteredMentors.map((mentor) =>
                mentor.skills ? (
                  <Grid item xs={12} sm={6} md={4} key={mentor.pk}>
                    <MentorCard
                      mentor={mentor}
                      token={token}
                      selectedDay={selectedDay}
                    />
                  </Grid>
                ) : null
              )}
            </Grid>
          </Box>

          {/* <SessionForm /> */}
        </Box>
      </Box>
    </Box>
  );
}
