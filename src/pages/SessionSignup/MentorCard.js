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
import Preview from "./Preview";

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

export default function MentorCard({
  mentor,
  selectedDay,
  handleSlotSelect,
  openSnackbar,
  handleCloseSnackbar,
  handleSubmitSession,
}) {
  const [selected, setSelected] = useState(null);

  const handleButtonChange = (event, newSelectedAvailability) => {
    setSelected(newSelectedAvailability);
    if (newSelectedAvailability) {
      handleSlotSelect(
        newSelectedAvailability.availabilityPk,
        newSelectedAvailability.start
      );
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container>
        <Grid
          item
          style={{ padding: 0 }}
          alignItems="center"
          justifyContent="center"
        >
          <Card sx={{ display: 'flex', flexDirection: 'column', width: 260, height: 550 }}>
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
                sx={{ height: 200 }}
                image="null"
                title="Profile Photo"
              />
            )}
            <CardContent sx={{ flexGrow: 1, overflowY: "auto"  }}>
              <Typography gutterBottom variant="h5" component="div">
                {mentor.first_name}
              </Typography>
              {/* Flip to preview if time is selected */}
              {selected ? (
                <Preview
                  selected={selected}
                  onCancel={() => setSelected(null)}
                  openSnackbar={openSnackbar}
                  handleCloseSnackbar={handleCloseSnackbar}
                  handleSubmitSession={handleSubmitSession}
                />
              ) : (
                <>
                  <Typography sx={{ fontWeight: "bold" }} component="span">
                    Bio:
                  </Typography>
                  <Typography component="span"> {mentor.about_me}</Typography>

                  {/* Pull in bio from database */}
                  {/* <Typography>
              Skills:{" "}
              {mentor.skills ? mentor.skills.join(", ") : "No skills listed"}
            </Typography> */}
                  <Typography
                    sx={{
                      textAlign: "center",
                      fontWeight: "bold",
                      marginTop: ".5rem",
                    }}
                  >
                    Available Time Slots:
                  </Typography>
                  <Box
                    style={{
                      height: "20rem",
                      textAlign: "center",
                    }}
                  >
                    {/*Makes the time slots scrollable */}
                    <ToggleButtonGroup
                      exclusive
                      value={selected}
                      orientation="vertical"
                      onChange={handleButtonChange}
                      sx={{paddingBottom: "2rem"}}
                    >
                      {mentor.availabilities &&
                        mentor.availabilities
                          .filter(
                            (availability) =>
                              new Date(availability.start).toDateString() ===
                              new Date(selectedDay).toDateString()
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
                                {new Date(
                                  availability.start
                                ).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}{" "}
                                -{" "}
                                {new Date(availability.end).toLocaleTimeString(
                                  [],
                                  { hour: "2-digit", minute: "2-digit" }
                                )}
                              </Typography>
                            </ToggleButton>
                          ))}
                    </ToggleButtonGroup>
                  </Box>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
