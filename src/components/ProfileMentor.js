import { useState, useEffect } from "react";
import axios from "axios";
import ProfileBasicInfo from "./ProfileBasicInfo";
import { Avatar, Typography, Grid } from "@mui/material";
import { Switch } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

export default function ProfileMentor({ token, pk, setAuth }) {
  // first name, last name, phone number
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [skills, setSkills] = useState("");
  const [about_me, setAboutMe] = useState("");

  useEffect(() => {
    axios
      .get(`https://team-production-system.onrender.com/myprofile/`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        setFirstName(
          res.data.first_name.charAt(0).toUpperCase() +
            res.data.first_name.slice(1)
        );
        setLastName(
          res.data.last_name.charAt(0).toUpperCase() +
            res.data.last_name.slice(1)
        );
        setPhoneNumber(
          res.data.phone_number
            .slice(2)
            .replace(/(\d{3})(\d{3})(\d{4})/, "($1)-$2-$3")
        ); // format phone number
        setProfilePhoto(res.data.profile_photo); // set profilePhoto state
      });
    axios
      .get("https://team-production-system.onrender.com/mentorinfo/", {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        setSkills(res.data[0].skills);
        setAboutMe(res.data[0].about_me);
      });
  }, [token, pk]);

  return (
    <div className="profile--page" style={{ marginTop: "50px" }}>
      <Grid container spacing={2} xs="auto">
        <Avatar sx={{ width: 200, height: 210 }} src={profilePhoto} />
        <Grid>
          <ProfileBasicInfo
            firstName={`First Name: ${firstName}`}
            lastName={`Last Name: ${lastName}`}
            phoneNumber={`Phone Number: ${phoneNumber}`}
            about_me={`About Me: ${about_me}`}
            skills={`Skills: ${skills}`}
          />
        </Grid>
      </Grid>
      <div
        className="mentorProfile--notifications"
        style={{ marginTop: "50px" }}
      >
        <Grid>
          <Typography variant="h5">Notifications</Typography>

          <Typography variant="h6">Email</Typography>
          <Grid>
            <FormGroup>
              <FormControlLabel
                control={<Switch />}
                label="Mentor Session Requested"
              />
              <FormControlLabel
                control={<Switch />}
                label="Mentor Session Confirmed"
              />
              <FormControlLabel
                control={<Switch />}
                label="Mentor Session Cancelled"
              />
            </FormGroup>
          </Grid>

          <Typography variant="h6">Text</Typography>
          <FormGroup>
            <FormControlLabel
              control={<Switch />}
              label="Mentor Session Requested"
            />
            <FormControlLabel
              control={<Switch />}
              label="Mentor Session Confirmed"
            />
            <FormControlLabel
              control={<Switch />}
              label="Mentor Session Cancelled"
            />
          </FormGroup>
        </Grid>
      </div>
    </div>
  );
}
