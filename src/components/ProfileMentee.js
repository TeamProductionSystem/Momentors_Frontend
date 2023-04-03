import { useState, useEffect } from "react";
import axios from "axios";
import { Grid, Avatar, Typography } from "@mui/material";


export default function ProfileMentee({ token, pk, setAuth }) {
  // first name, last name, phone number
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");

  useEffect(() => {
    axios
      .get(`https://team-production-system.onrender.com/myprofile/`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        setFirstName(res.data.first_name.charAt(0).toUpperCase() + res.data.first_name.slice(1));
        setLastName(res.data.last_name.charAt(0).toUpperCase() + res.data.last_name.slice(1));
        setPhoneNumber(res.data.phone_number.slice(2).replace(/(\d{3})(\d{3})(\d{4})/, '($1)-$2-$3')); // format phone number
        setProfilePhoto(res.data.profile_photo); // set profilePhoto state
      });
  }, [token, pk]);

  return (
    <div className="profile--page" style={{ marginTop: "50px" }} >
      <Grid container spacing={2}>
        <Grid item>
          <Avatar sx={{ width: 200, height: 210 }} src={profilePhoto} />
        </Grid>
        <Grid item>
          <Typography variant="h4">{`UserName: ${firstName} ${lastName}`}</Typography>
          <Typography variant="h6">{`Phone Number: ${phoneNumber}`}</Typography>
        </Grid>
      </Grid>
    </div>
  );
}
