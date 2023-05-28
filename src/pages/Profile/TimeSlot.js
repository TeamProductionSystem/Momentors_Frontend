import { useState } from "react";
import axios from "axios";
import {
  Box,
  Stack,
  Typography,
  Button,
  TextField,
  Snackbar,
} from "@mui/material";
import Alert from "@mui/material/Alert";

export default function TimeSlot({ token, pk, setAuth }) {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleStartTimeChange = (event) => {
    setStartTime(event.target.value);
  };

  const handleEndTimeChange = (event) => {
    setEndTime(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `https://team-production-system.onrender.com/availability/`,

        {
          start_time: startTime,
          end_time: endTime,
        },
        {
          headers: { Authorization: `Token ${token}` },
        }
      )
      .then((response) => {
        setOpenSnackbar(true);
        setStartTime("");
        setEndTime("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Box>
      <Stack spacing={2} sx={{ mb: 2 }}>
        <Typography variant="h6">Post Availability</Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2} direction="row">
            <TextField
              id="start-time"
              label="Start Time"
              type="datetime-local"
              value={startTime}
              onChange={handleStartTimeChange}
              InputLabelProps={{
                shrink: true,
              }}
              required
            />
            <TextField
              id="end-time"
              label="End Time"
              type="datetime-local"
              value={endTime}
              onChange={handleEndTimeChange}
              InputLabelProps={{
                shrink: true,
              }}
              required
            />
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Stack>
        </form>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity="success"
            sx={{ width: "100%" }}
          >
            Availability Posted!
          </Alert>
        </Snackbar>
      </Stack>
    </Box>
  );
}
