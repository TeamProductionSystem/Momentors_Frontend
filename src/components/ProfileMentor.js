import { useState, useEffect } from "react";
import axios from "axios";
import ProfileBasicInfo from "./ProfileBasicInfo";
import { Avatar, Typography, Box, Stack } from "@mui/material";
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
    <Box className="mentorprofile--page" margin="1rem">
      <Stack container spacing={1} direction="row">
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
          <Stack spacing={1} textAlign={"Center"} fontSize={"25px"}>
            {skills}
          </Stack>
        </Box>
        <Box width={"100%"} className="mentorProfile--notifications">
          <Box>
            <Typography variant="h5" textAlign={"center"}>
              Notifications
            </Typography>
            <Typography variant="h6">Email</Typography>
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
          </Box>
        </Box>
      </Stack>
      <Box sx={{ marginTop: "4rem" }}>
        <Typography variant="h4">Time Slots:</Typography>
      </Box>
    </Box>
  );
}
