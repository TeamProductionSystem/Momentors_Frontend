import { useState, useEffect } from "react";
import axios from "axios";
import ProfileBasicInfo from "./ProfileBasicInfo";
import { Grid, Card, CardMedia, CardContent, Typography } from "@mui/material";
import { maxHeight } from "@mui/system";

export default function ProfileMentor({ token, pk, setAuth }) {
  // first name, last name, phone number
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    axios
      .get(`https://team-production-system.onrender.com/myprofile/`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        setFirstName(res.data.first_name);
        setLastName(res.data.last_name);
        setPhoneNumber(res.data.phone_number);
        console.log(res);
      });
  }, [token, pk]);

  return (
    <div className="profile--page">
      <br />
      <Grid container alignItems="center" justifyContent="center">
        <Card sx={{ maxWidth: 800 }} elevation="4">
          <CardMedia
            sx={{ height: 400 }}
            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZfWLr5vMAESMl38Yncgk4rl7y3-_OiD9nnprz8SGTj2ClL1NfEsn46eXLiPO82dWXZuk&usqp=CAU"
            title="master yoda"
          />
          <CardContent>
            <Typography gutterBottom>
              Hi, I'm so and so and I am skilled at such and such!
            </Typography>
            {/* Pull in bio from database */}
            <Typography>
              <h4>Skills:</h4>
            </Typography>
          </CardContent>
          {/* Pull in marked skills from database */}
        </Card>
        <ProfileBasicInfo
          firstName={firstName}
          lastName={lastName}
          phoneNumber={phoneNumber}
        />
      </Grid>
    </div>
  );
}
