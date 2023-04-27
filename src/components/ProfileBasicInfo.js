import { useNavigate } from "react-router-dom";
import { Button, Grid, Typography, Avatar } from "@mui/material";

export default function ProfileBasicInfo({
  firstName,
  lastName,
  phoneNumber,
  about_me,
  skills,
  email,
  profilePhoto,
}) {
  // We can set this component up to include different info depending on what we pass in (for instance the wireframes currently indicate that students will have a team # and mentors will not)
  const navigate = useNavigate();

  return (
    <Grid container border="solid">
      <Grid item xs={6}>
        <Avatar sx={{ width: 200, height: 210 }} src={profilePhoto} />
      </Grid>
      <Grid item xs={6}>
        <Typography>
          {firstName} {lastName}
        </Typography>
        <br />
        <Typography>Email:</Typography>
        <Typography>{email}</Typography>
        <Typography>Phone Number:</Typography>
        <Typography>{phoneNumber}</Typography>
        <Button variant="outlined" onClick={() => navigate("/editprofile")}>
          Edit
        </Button>
      </Grid>
    </Grid>
  );
}
