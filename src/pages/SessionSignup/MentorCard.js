import { Grid, Card, CardMedia, CardContent, Typography, ToggleButton, ToggleButtonGroup} from "@mui/material";
import { useState } from "react";

export default function MentorCard({ mentor, selectedDay }) {
  const [selected, setSelected] = useState(null);

  const handleButtonChange = (event, index) => {
    setSelected(index)
  }

  return (
    <>
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
              image="path_to_default_image.jpg" // path to your default image
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
            <ToggleButtonGroup
            sx={{
              marginTop: '1rem',
              display: 'flex',
              flexDirection: 'column',
            }}
              exclusive
              value={selected}
              onChange={handleButtonChange}
              >
        {mentor.availabilities && mentor.availabilities
            .filter(availability => new Date(availability.start).toDateString() === new Date(selectedDay).toDateString())
            .map((availability, index) => (
                  <ToggleButton
                  key={index}
                  value={index}
                sx={{
                  marginTop: '1rem',
                  alignSelf: 'center',
                  width: '90%',
                  border: 'darkgrey solid',
                }}>
                    <Typography sx={{
                    cursor: 'pointer',
                    }}>
                    {new Date(availability.start).toLocaleTimeString()} - {new Date(availability.end).toLocaleTimeString()}
                    </Typography>
                  </ToggleButton> 
            ))}
            </ToggleButtonGroup>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
}
