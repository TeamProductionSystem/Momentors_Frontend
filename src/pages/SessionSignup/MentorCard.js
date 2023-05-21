import { Grid, Card, CardMedia, CardContent, Typography } from "@mui/material";

export default function MentorCard({ mentor }) {
  return (
    <>
      <Grid container alignItems="center" justifyContent="center">
        <Card sx={{ minWidth: 300, maxWidth: 350, minHeight: 300}} elevation={4}>
          <CardMedia
            sx={{
              height: 300,
            }}
            image={mentor.profile_photo}
            title="Profile Photo"
          />
          <CardContent>
            {mentor.first_name} {mentor.last_name}
            <Typography >Bio: {mentor.about_me}</Typography>
            {/* Pull in bio from database */}
            <Typography>Skills: {mentor.skills.join(', ') }</Typography>
          </CardContent>
          {/* Pull in marked skills from database */}
        </Card>
      </Grid>
    </>
  );
}
