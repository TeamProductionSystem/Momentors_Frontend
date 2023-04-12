import { useState, useEffect } from "react";
import axios from "axios";
import ProfileBasicInfo from "./ProfileBasicInfo";
import { Grid, Card, CardMedia, CardContent, Typography } from "@mui/material";

export default function MentorCard({ token, pk, setAuth }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [skills, setSkills] = useState("");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BE_URL}/myprofile/`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        setFirstName(res.data.first_name);
        setLastName(res.data.last_name);
        setPhoneNumber(res.data.phone_number);
        setProfilePhoto(res.data.profile_photo); // set profilePhoto state
        console.log(res);
      });

    axios
      .get(`${process.env.REACT_APP_BE_URL}/mentorinfo/`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        setAboutMe(res.data[0].about_me);
        setSkills(res.data[0].skills);
        console.log(res.data);
      });
  }, [token, pk]);

  return (
    <div>
      <Grid container alignItems="center" justifyContent="center">
        <Card sx={{ minWidth: 400, maxWidth: 400 }} elevation="4">
          <CardMedia
            sx={{ 
              height: 400, 
            }}
            image={profilePhoto}
            title="Profile Photo"
          />
          <CardContent>
            <Typography gutterBottom>{aboutMe}</Typography>
            {/* Pull in bio from database */}
            <Typography>
              <h4>Skills:</h4>
              {skills}
            </Typography>
          </CardContent>
          {/* Pull in marked skills from database */}
        </Card>
      </Grid>
      <ProfileBasicInfo
        firstName={firstName}
        lastName={lastName}
        phoneNumber={phoneNumber}
      />
      ;
    </div>
  );
}
