import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Stack,
  Typography,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

export default function TimeSlot({ token, pk, setAuth }) {
  const [availability, setAvailability] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://team-production-system.onrender.com/availability/", {}, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        setAvailability(res.data);
      });
  }; 

  const times = [
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "01:00 PM",
    "01:30 PM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
    "04:30 PM",
    "05:00 PM",
    "05:30 PM",
    "06:00 PM",
    "06:30 PM",
    "07:00 PM",
    "07:30 PM",
    "08:00 PM",
    "08:30 PM",
  ];
  const dropdownOptions = times.map((time) => (
    <MenuItem key={time} value={time}>
      {time}
    </MenuItem>
  ));

  const handleChange = (day, value) => {
    setAvailability((prevState) => ({
      ...prevState,
      [day]: value,
    }));
  };

  return (
    <Box className="timeslot--page" margin="1rem">
      <form onSubmit={handleSubmit} id="timeslot-form">
      <Stack container spacing={1} direction="row">
        <Box sx={{ fontSize: "20px" }} textAlign={"Center"}>
          <Typography variant="h4">Time Slot</Typography>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="monday-label">Monday</InputLabel>
            <Select
              labelId="monday-label"
              id="monday"
              multiple
              value={availability["monday"] || []}
              onChange={(e) => handleChange("monday", e.target.value)}
              inputProps={{
                name: "Monday",
                id: "monday",
              }}
            >
              {dropdownOptions}
            </Select>
            {/* options for Monday */}
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="tuesday-label">Tuesday</InputLabel>
            <Select
              labelId="tuesday-label"
              id="tuesday"
              multiple
              value={availability["tuesday"] || []}
              onChange={(e) => handleChange("tuesday", e.target.value)}
              inputProps={{
                name: "Tuesday",
                id: "tuesday",
              }}
            >
              {dropdownOptions}
              {/* options for Tuesday */}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="wednesday-label">Wednesday</InputLabel>
            <Select
              labelId="wednesday-label"
              id="wednesday"
              multiple
              value={availability["wednesday"] || []}
              onChange={(e) => handleChange("wednesday", e.target.value)}
              inputProps={{
                name: "Wednesday",
                id: "wednesday",
              }}
            >
              {dropdownOptions}
              {/* options for Wednesday */}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="thursday-label">Thursday</InputLabel>
            <Select
              labelId="thursday-label"
              id="thursday"
              multiple
              value={availability["thursday"] || []}
              onChange={(e) => handleChange("thursday", e.target.value)}
              inputProps={{
                name: "Thursday",
                id: "thursday",
              }}
            >
              {dropdownOptions}
              {/* options for Thursday */}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="friday-label">Friday</InputLabel>
            <Select
              labelId="friday-label"
              id="friday"
              multiple
              value={availability["friday"] || []}
              onChange={(e) => handleChange("friday", e.target.value)}
              inputProps={{
                name: "Friday",
                id: "friday",
              }}
            >
              {dropdownOptions}
              {/* options for Friday */}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="saturday-label">Saturday</InputLabel>
            <Select
              labelId="saturday-label"
              id="saturday"
              multiple
              value={availability["saturday"] || []}
              onChange={(e) => handleChange("saturday", e.target.value)}
              inputProps={{
                name: "Saturday",
                id: "saturday",
              }}
            >
              {dropdownOptions}
              {/* options for Saturday */}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="sunday-label">Sunday</InputLabel>
            <Select
              labelId="sunday-label"
              id="sunday"
              multiple
              value={availability["sunday"] || []}
              onChange={(e) => handleChange("sunday", e.target.value)}
              inputProps={{
                name: "Sunday",
                id: "sunday",
              }}
            >
              {/* options for Sunday */}
            </Select>
          </FormControl>

          <Button type="submit" variant="contained" form="timeslot-form">
            Submit
          </Button>
        </Box>
      </Stack>
      </form>
    </Box>
  );
}


