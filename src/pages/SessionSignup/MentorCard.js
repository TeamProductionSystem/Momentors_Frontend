import { Grid, Card, CardMedia, CardContent, Typography } from "@mui/material";

export default function MentorCard({ mentor, selectedDay }) {
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
                <Typography key={index}>
                    {new Date(availability.start).toLocaleTimeString()} - {new Date(availability.end).toLocaleTimeString()}
                </Typography>
            ))}
               
            
          </CardContent>
        </Card>
      </Grid>
    </>
  );
}
