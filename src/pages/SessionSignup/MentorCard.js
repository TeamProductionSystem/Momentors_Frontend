import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Box,
} from "@mui/material";
import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiToggleButtonGroup: {
      styleOverrides: {
        root: {
          borderLeft: "none",
        },
      },
    },
  },
});

export default function MentorCard({ mentor, selectedDay, onSlotSelect }) {
  const [selected, setSelected] = useState(null);

  const handleButtonChange = (event, newSelectedAvailability) => {
    setSelected(newSelectedAvailability);
    if (newSelectedAvailability) {
      onSlotSelect(newSelectedAvailability.availabilityPk, newSelectedAvailability.start, newSelectedAvailability.end)
    }

  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container alignItems="center" justifyContent="center">
        <Card
          sx={{ minWidth: 300, maxWidth: 375, minHeight: 300 }}
          elevation={4}
        >
          {mentor.profile_photo ? (
            <CardMedia
              sx={{
                height: 300,
              }}
              image={mentor.profile_photo}
              title="Profile Photo"
            />
          ) : (
            <CardMedia
              sx={{ height: 300 }}
              image="null"
              title="Profile Photo"
            />
          )}
          <CardContent>
            {mentor.first_name} {mentor.last_name}
            <Typography>Bio: {mentor.about_me}</Typography>
            {/* Pull in bio from database */}
            <Typography>
              Skills:{" "}
              {mentor.skills ? mentor.skills.join(", ") : "No skills listed"}
            </Typography>
            <Typography>Available Time Slots:</Typography>
            <Box style={{maxHeight: '250px', overflowY: 'auto'}}> {/*Makes the time slots scrollable */}
            <ToggleButtonGroup
              sx={{
                marginTop: "1rem",
              }}
              exclusive
              value={selected}
              orientation='vertical'
              onChange={handleButtonChange}
            >
              {mentor.availabilities &&
                mentor.availabilities
                  .filter(availability => (
                      new Date(availability.start).toDateString() ===
                      new Date(selectedDay).toDateString()
                    )
                  ) 
                  .map((availability) => (
                    <ToggleButton
                      key={availability.pk}
                      value={availability}
                      sx={{
                        marginTop: "1rem",
                        alignSelf: "center",
                        width: "100%",
                        border: "darkgrey solid",
                      }}
                    >
                      <Typography
                        sx={{
                          cursor: "pointer",
                        }}
                      >
                        {new Date(availability.start).toLocaleTimeString()} -{" "}
                        {new Date(availability.end).toLocaleTimeString()}
                      </Typography>
                    </ToggleButton>
                  ))}
            </ToggleButtonGroup>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </ThemeProvider>
  );
}
