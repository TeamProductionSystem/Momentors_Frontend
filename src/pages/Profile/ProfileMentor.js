import { useState, useEffect } from "react";
import axios from "axios";
import ProfileBasicInfo from "../Profile/ProfileBasicInfo";
import {
  Avatar,
  Typography,
  Box,
  Stack,
  Grid,
  List,
  ListItem,
} from "@mui/material";
import { Switch } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import TimeSlot from "../Profile/TimeSlot";

export default function ProfileMentor({ token, pk, setAuth }) {
  // first name, last name, phone number
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [skills, setSkills] = useState([]);
  const [about_me, setAboutMe] = useState("");

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
      .get(`${process.env.REACT_APP_BE_URL}/mentorinfo/`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        setSkills(res.data[0].skills);
        setAboutMe(res.data[0].about_me);
      });
  }, [token, pk]);

  return (
    <Box className="mentorprofile--page" margin="1rem">
      <Stack spacing={1} direction="row">
        <Avatar sx={{ width: 200, height: 210 }} src={profilePhoto} />
        <Box sx={{ fontSize: "20px" }} textAlign={"Center"}>
          <ProfileBasicInfo
            firstName={`First Name: ${firstName}`}
            lastName={`Last Name: ${lastName}`}
            phoneNumber={`Phone Number: ${phoneNumber}`}
          />
        </Box>
        <Box sx={{ border: "2px solid", borderRadius: "16px" }} width="100%">
          <Typography
            variant="h5"
            textAlign={"Center"}
            sx={{ textDecoration: "underline" }}
          >
            About Me
          </Typography>
          <Box sx={{ fontSize: "20px", padding: ".5rem" }}>{about_me}</Box>
        </Box>
      </Stack>
      <Stack direction="row" marginTop={"1.5rem"}>
        <Box
          sx={{ border: "2px solid", borderRadius: "16px" }}
          width={"15rem"}
          marginRight={".5rem"}
        >
          <Typography
            variant="h5"
            textAlign={"Center"}
            sx={{ textDecoration: "underline" }}
          >
            What You Know
          </Typography>
          <Box>
            <List>
              {skills.map((skill, index) => (
                <ListItem
                  key={index}
                  sx={{
                    fontSize: "20px",
                    justifyContent: "center",
                  }}
                >
                  {skill}
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
        <Box width={"100%"} className="mentorProfile--notifications">
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
                      Notify me when a mentee schedules a session
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography fontSize={"18px"} paddingTop={".75rem"}>
                      Notify me when a mentee cancels a session
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
              </Grid> */}
            </Grid>
          </Box>
        </Box>
      </Stack>
      <Box sx={{ marginTop: "4rem" }}>
        <Box>
          <TimeSlot token={token} />
        </Box>
      </Box>
    </Box>
  );
}
