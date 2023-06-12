import { useState, useEffect } from "react";
import axios from "axios";
import ProfileBasicInfo from "./ProfileBasicInfo";
import { Avatar, Typography, Grid, Box } from "@mui/material";
import { Switch } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

export default function ProfileMentee({ token, pk, setAuth }) {
  // first name, last name, phone number
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [teamNumber, setTeamNumber] = useState("");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BE_URL}/myprofile/`, {
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
        if (res.data.phone_number) {
          setPhoneNumber(
            res.data.phone_number
              .slice(2)
              .replace(/(\d{3})(\d{3})(\d{4})/, "($1)$2-$3")
          );
        }
        setProfilePhoto(res.data.profile_photo); // set profilePhoto state
      });
    axios
      .get(`${process.env.REACT_APP_BE_URL}/menteeinfo/`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        setTeamNumber(res.data[0].team_number);
      });
  }, [token, pk]);

  return (
    <Box className="profile--page" style={{ marginTop: "2rem" }}>
      <Grid container marginLeft={"1.5rem"}>
        <Avatar sx={{ width: 200, height: 210 }} src={profilePhoto} />
        <Grid marginLeft={"1rem"} paddingTop={"1rem"}>
          <Typography variant="h5">{`Team Number: ${teamNumber}`}</Typography>
          <ProfileBasicInfo
            firstName={`First Name: ${firstName}`}
            lastName={`Last Name: ${lastName}`}
            phoneNumber={`Phone Number: ${phoneNumber}`}
          />
        </Grid>
      </Grid>
      <Box
        className="menteeProfile--notifications"
        style={{ marginTop: "50px", marginLeft: "1rem" }}
      >
        <Box>
          <Typography variant="h4" paddingLeft={"1rem"}>
            Notifications:
          </Typography>

          <Grid container direction={"row"} spacing={2}>
            <Grid marginRight={"rem"} marginLeft={"4rem"} width={"30rem"}>
              <Grid item>
                {/* <FormControl width="1rem">
                      <InputLabel id="demo-simple-select-label">
                        Time
                      </InputLabel>{" "}
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        // value={age}
                        // label="Age"
                        // onChange={handleChange}
                      >
                        <MenuItem value={10}>15 Mintues</MenuItem>
                        <MenuItem value={20}>30 Mintues</MenuItem>
                        <MenuItem value={45}>45 Minutes</MenuItem>
                        <MenuItem value={60}>60 Minutes</MenuItem>
                      </Select>
                    </FormControl> */}

                <Grid item>
                  <br></br>
                </Grid>
                <Grid item>
                  <Typography fontSize={"18px"} paddingTop={"1.2rem"}>
                    Notify me when a mentor confirms a session
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography fontSize={"18px"} paddingTop={".75rem"}>
                    Notify me when a mentor cancels a session
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography fontSize={"18px"} paddingTop={".75rem"}>
                    Notify me 15 minutes before a session
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography fontSize={"18px"} paddingTop={".75rem"}>
                    Notify me 60 minutes before a session
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid marginRight={"2rem"}>
              <Typography variant="h6">Email Notifications</Typography>

              <Grid item textAlign={"center"}>
                <FormControlLabel control={<Switch />} />
                <Grid item>
                  <FormControlLabel control={<Switch />} />
                </Grid>
                <Grid item>
                  <FormControlLabel control={<Switch />} />
                </Grid>
                <Grid item>
                  <FormControlLabel control={<Switch />} />
                </Grid>
              </Grid>
            </Grid>
            {/* <Grid>
              <Typography variant="h6">Text Notifications</Typography>

              <Grid item textAlign={"center"}>
                <FormControlLabel control={<Switch />} />
                <Grid Item>
                  <FormControlLabel control={<Switch />} />
                </Grid>
                <Grid item>
                  <FormControlLabel control={<Switch />} />
                </Grid>
                <Grid item>
                  <FormControlLabel control={<Switch />} />
                </Grid>
              </Grid>
            </Grid> */}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
