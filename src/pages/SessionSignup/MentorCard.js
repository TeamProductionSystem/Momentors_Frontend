import { Grid, Card, CardMedia, CardContent, Typography, ToggleButton, ToggleButtonGroup} from "@mui/material";
import { useState } from "react";

export default function MentorCard({ mentor, selectedDay }) {
  const [selected, setSelected] = useState(false);

  return (
    <>
      <Grid container alignItems="center" justifyContent="center">
        <Card
          sx={{ minWidth: 300, maxWidth: 350, minHeight: 300 }}
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
        {mentor.availabilities && mentor.availabilities
            .filter(availability => new Date(availability.start).toDateString() === new Date(selectedDay).toDateString())
            .map((availability, index) => (
              <ToggleButtonGroup
              sx={{
                marginTop: '1rem'
              }}
                exclusive
                >
                  <ToggleButton
                  selected={selected}
                  onClick={() => {
                  setSelected(!selected);
                }}
                  value={`${new Date(availability.start).toLocaleTimeString()} - ${new Date(availability.end).toLocaleTimeString()}`}>
                  <Typography key={index} sx={{
                    cursor: 'pointer',
                    }}>
                    {new Date(availability.start).toLocaleTimeString()} - {new Date(availability.end).toLocaleTimeString()}
                </Typography>
                </ToggleButton>
                </ToggleButtonGroup>
            ))}
          </CardContent>
        </Card>
      </Grid>
    </>
  );
}
