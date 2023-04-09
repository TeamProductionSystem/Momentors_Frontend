import { useNavigate } from "react-router-dom";
import { Button, Grid, Typography } from "@mui/material";

export default function ProfileBasicInfo({ firstName, lastName, phoneNumber, about_me, skills }) {
  // We can set this component up to include different info depending on what we pass in (for instance the wireframes currently indicate that students will have a team # and mentors will not)
  const navigate = useNavigate();

  return (
    <Grid container alignItems="center" justifyContent="center">
      <Grid item className="profile--heading">
        <img src="" alt="" />
        <Typography>
          {firstName} 
        </Typography>
        <Typography>
          {lastName} 
        </Typography>
        <p>{phoneNumber}</p>
        <Button variant="outlined" onClick={() => navigate("/editprofile")}>
          Edit
        </Button>
      </Grid>
    </Grid>
  );
}
