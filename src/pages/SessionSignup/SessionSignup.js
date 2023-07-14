import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import MentorCard from "./MentorCard";
import SubmitButton from "./SubmitButton";
// import SessionForm from "./SessionForm";

import {
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Grid,
  Typography,
} from "@mui/material";

export default function SessionSignup({ token }) {
  const [skills, setSkills] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [filteredMentors, setFilteredMentors] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [timeBlock, setTimeBlock] = useState(30);
  const [selectedAvailabilityPk, setSelectedAvailabilityPk] = useState(null);
  const [selectedStartTime, setSelectedStartTime] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [selectedDayLabel, setSelectedDayLabel] = useState(""); // for highlighting the selected day
  const navigate = useNavigate();

  const handleTimeBlockChange = (event) => {
    setTimeBlock(event.target.value);
  };

  const handleSlotSelect = (availPk, start, end) => {
    setSelectedAvailabilityPk(availPk);
    setSelectedStartTime(start);
  };

  useEffect(() => {}, [selectedStartTime]);

  const getTimeBlocks = (start, end, blockLength, slotPk) => {
    const startTime = start instanceof Date ? start : new Date(start);
    const endTime = end instanceof Date ? end : new Date(end);
    const timeBlocks = [];

    while (startTime < endTime) {
      const blockEnd = new Date(startTime.getTime() + blockLength * 60000);

      if (blockEnd > endTime) {
        break;
      }

      timeBlocks.push({
        availabilityPk: slotPk,
        start: new Date(startTime),
        end: blockEnd,
      });

      startTime.setTime(blockEnd.getTime());
    }

    return timeBlocks;
  };

  const handleDayChange = (day) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // set time to 00:00:00
    if (day === "Tomorrow") {
      today.setDate(today.getDate() + 1);
    } else if (day === "The Next Day") {
      today.setDate(today.getDate() + 2);
    } else if (day === "Today") {
    }

    setSelectedDay(today);
    setSelectedDayLabel(day); // sets the selected day's label for highlighting
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BE_URL}/mentor/`, {
        headers: { Authorization: `Token ${token}` },
      })

      .then((response) => {
        setMentors(response.data);

        const skillsSet = new Set(); // creates a new Set to store unique skills
        response.data.forEach((mentor) => {
          // Check if the mentor is available
          if (
            mentor.availabilities &&
            mentor.availabilities.length > 0 &&
            mentor.skills
          ) {
            // If mentor is available, add their skills to the set
            mentor.skills.forEach((skill) => {
              skillsSet.add(skill); // add each skill to the Set
            });
          }
        });
        // convert Set to array and set as state
        setSkills(Array.from(skillsSet));
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
                  return getTimeBlocks(
                    blockStartTime,
                    blockEndTime,
                    timeBlock,
                    slot.pk
                  );
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

  function handleSubmitSession() {
    if (!selectedAvailabilityPk) {
      alert("Please select a mentor");
      return;
    }
    if (!selectedStartTime) {
      alert("Please select a start time");
      return;
    }

    const startTime = new Date(selectedStartTime.toISOString());
    axios
      .post(
        `${process.env.REACT_APP_BE_URL}/sessionrequest/`,
        {
          mentor_availability: selectedAvailabilityPk,
          start_time: startTime,
          session_length: timeBlock,
        },
        {
          headers: { Authorization: `Token ${token}` },
        }
      )
      .then((response) => {
        console.log("Session created successfully");
        setOpenSnackbar(true);
        navigate("/menteesessions");
      })
      .catch((error) => {
        console.log("error:", error);
        // Temporary solution in case mentor is already signed up during this time. Backend will be updated to prevent display of times they are already scheduled. Backend will also be updated to return a more specific error than 500 error just in case we display a scheduled time. Then we can update this logic to trigger the alert for that specific error return.
        if (error.message === "Request failed with status code 500") {
          alert(
            "A session with this mentor is already scheduled during this time."
          );
        }
      });
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ backgroundColor: "#1E1E1E", minHeight: "100vh" }}>
      <Typography
        variant="h3"
        textAlign={"center"}
        paddingTop={"4.5rem"}
        sx={{ color: "#FFFFFF", fontWeight: "700" }}
      >
        Sessions Sign Up
      </Typography>
      <Grid
        container
        justifyContent="center"
        sx={{ marginTop: "3rem", padding: "0 10%" }}
      >
        <Grid item xs={8} sm={6} md={4}>
          <FormControl
            sx={{
              minWidth: "13.75rem",
              backgroundColor: "#FFFFFF",
              borderRadius: 4,
            }}
          >
            <InputLabel
              id="skills"
              sx={{
                color: "#000",
                "&.Mui-focused": { color: "#000" },
                "&.MuiInputLabel-shrink": { color: "#000" },
              }}
            >
              Select A Topic
            </InputLabel>
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
        </Grid>
        <Grid item xs={8} sm={6} md={4}>
          <FormControl
            sx={{
              minWidth: "13.75rem",
              backgroundColor: "#FFFFFF",
              borderRadius: 4,
            }}
          >
            <InputLabel id="select-day">Select a Day</InputLabel>
            <Select
              labelId="select-day"
              label="Select a Day"
              value={selectedDayLabel}
              onChange={(event) => handleDayChange(event.target.value)}
            >
              <MenuItem value="Today">Today</MenuItem>
              <MenuItem value="Tomorrow">Tomorrow</MenuItem>
              <MenuItem value="The Next Day">The Next Day</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={8} sm={6} md={4}>
          <FormControl
            sx={{
              minWidth: "13.75rem",
              backgroundColor: "#FFFFFF",
              borderRadius: 4,
            }}
          >
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
        </Grid>
      </Grid>
      <Box>
        <Typography
          variant="h4"
          sx={{ marginTop: "7.62rem", marginLeft: "1.5rem", color: "#FFFFFF" }}
        >
          Select a Mentor for {selectedDayLabel}:
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
                  onSlotSelect={handleSlotSelect}
                />
              </Grid>
            ) : null
          )}
        </Grid>
      </Box>
      {/* The Submit button. It's only be visible if a mentor is selected */}
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}
      >
        {filteredMentors.length > 0 && (
          <SubmitButton
            handleSubmitSession={handleSubmitSession}
            openSnackbar={openSnackbar}
            handleCloseSnackbar={handleCloseSnackbar}
          />
        )}
      </Box>

      {/* <SessionForm /> */}
    </Box>
  );
}
