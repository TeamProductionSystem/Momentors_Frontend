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

export default function TimeSlot({
  token,
  pk,
  setAuth,
  setRefreshAvailabilities,
}) {
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
    // Convert time to UTC to send to back end
    let startTimeSend = new Date(startTime);
    startTimeSend.toISOString();
    let endTimeSend = new Date(endTime);
    endTimeSend.toISOString();
    axios
      .post(
        `${process.env.REACT_APP_BE_URL}/availability/`,

        {
          start_time: startTimeSend,
          end_time: endTimeSend,
        },
        {
          headers: { Authorization: `Token ${token}` },
        }
      )
      .then((response) => {
        setOpenSnackbar(true);
        setStartTime("");
        setEndTime("");
        setRefreshAvailabilities(true);
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
        <Typography variant="h4">Post Availability</Typography>
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
