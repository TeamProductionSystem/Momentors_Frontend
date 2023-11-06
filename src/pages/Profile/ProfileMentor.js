import { useState, useEffect } from "react";
import axios from "axios";
import ProfileBasicInfo from "../Profile/ProfileBasicInfo";
import CurrentAvailabilities from "./Current Availabilities";
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
import { styled } from "@mui/material/styles";
import Survey from "./Survey"

export default function ProfileMentor({ token, pk, setAuth }) {
  // first name, last name, phone number
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [skills, setSkills] = useState([]);
  const [about_me, setAboutMe] = useState("");
  const [teamNumber, setTeamNumber] = useState("");
  //Update the availabilities when the user adds a new availability
  const [refreshAvailabilities, setRefreshAvailabilities] = useState(false);

  // track notification switch settings
  // set up similarly to https://webdevassist.com/reactjs-materialui/material-ui-switch
  const [checkedSessionReq, setCheckedSessionReq] = useState(false);
  const [checkedSessionCanc, setCheckedSessionCanc] = useState(false);
  const [checkedSessionConfirmed, setCheckedSessionConfirmed] = useState(false);
  const [checked15Min, setChecked15Min] = useState(false);
  const [checked60Min, setChecked60Min] = useState(false);

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
        setTeamNumber(res.data[0].team_number);
      });
    axios
      .get(`${process.env.REACT_APP_BE_URL}/notificationsettings/${pk}/`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        setCheckedSessionReq(res.data.session_requested);
        setCheckedSessionCanc(res.data.session_canceled);
        setCheckedSessionConfirmed(res.data.session_confirmed);
        setChecked15Min(res.data.fifteen_minute_alert);
        setChecked60Min(res.data.sixty_minute_alert);
      });
  }, [token, pk]);

  // handle Switch functionality
  const handleSessionReq = (event) => {
    setCheckedSessionReq(event.target.checked);
    axios.patch(
      `${process.env.REACT_APP_BE_URL}/notificationsettings/${pk}/`,
      {
        session_requested: event.target.checked,
      },
      {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  };

  const handleSessionCanc = (event) => {
    setCheckedSessionCanc(event.target.checked);
    axios.patch(
      `${process.env.REACT_APP_BE_URL}/notificationsettings/${pk}/`,
      {
        session_canceled: event.target.checked,
      },
      {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  };

  const handle15Min = (event) => {
    setChecked15Min(event.target.checked);
    axios.patch(
      `${process.env.REACT_APP_BE_URL}/notificationsettings/${pk}/`,
      {
        fifteen_minute_alert: event.target.checked,
      },
      {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  };

  const handle60Min = (event) => {
    setChecked60Min(event.target.checked);
    axios.patch(
      `${process.env.REACT_APP_BE_URL}/notificationsettings/${pk}/`,
      {
        sixty_minute_alert: event.target.checked,
      },
      {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  };

  const handleSessionConfirmed = (event) => {
    setCheckedSessionConfirmed(event.target.checked);
    axios.patch(
      `${process.env.REACT_APP_BE_URL}/notificationsettings/${pk}/`,
      {
        session_confirmed: event.target.checked,
      },
      {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  };

  // custom switch styling like iOS
  const IOSSwitch = styled((props) => (
    <Switch
      focusVisibleClassName=".Mui-focusVisible"
      disableRipple
      {...props}
    />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 2,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(16px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor:
            theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
          opacity: 1,
          border: 0,
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#33cf4d",
        border: "6px solid #fff",
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        color:
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 22,
      height: 22,
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
      opacity: 1,
      transition: theme.transitions.create(["background-color"], {
        duration: 500,
      }),
    },
  }));

  return (
    <Box
      className="mentorprofile--page"
      margin="1rem"
      sx={{ display: "grid", gridTemplateRows: "auto" }}
    >
      <Stack spacing={1} direction="row">
        <Avatar sx={{ width: 200, height: 210 }} src={profilePhoto} />
        <Box sx={{ fontSize: "20px" }} textAlign={"Center"}>
          <Typography variant="h5">{ `Team Number: ${ teamNumber }`}</Typography>
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
        {/* Seeting the size of the "What You Know" box on 192 and 193, so that is does not grow 
        when the user adds more availabilities */}
        <Box
          sx={{
            border: "2px solid",
            borderRadius: "16px",
            width: "15rem",
            marginRight: ".5rem",
            maxHeight: "40rem",
            overflow: "auto",
          }}
        >
          <Typography
            variant="h5"
            textAlign={"Center"}
            sx={{ textDecoration: "underline" }}
          >
            What You Know
          </Typography>

          <List>
            {skills.map((skill, index) => (
              <ListItem
                key={index}
                sx={{
                  fontSize: "20px",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                {skill}
              </ListItem>
            ))}
          </List>
        </Box>
        <Box width={"100%"} className="mentorProfile--notifications">
          <Box>
            <Typography variant="h4" paddingLeft={"1rem"}>
              Notifications:
            </Typography>
            {/* spacing should be 12 perhaps */}
            <Grid container direction={"row"} spacing={2}>
              <Grid sx={{ marginLeft: "4rem", width: "35rem" }}>
                <Grid item>
                  <Grid
                    item
                    display={"flex"}
                    justifyContent={"space-between"}
                    marginBottom={".5rem"}
                    marginTop={"1.5rem"}
                  >
                    <Typography fontSize={"18px"} alignSelf={"center"}>
                      Notify me when a mentee schedules a session
                    </Typography>
                    <FormControlLabel
                      control={
                        <IOSSwitch
                          checked={checkedSessionReq}
                          onChange={handleSessionReq}
                        />
                      }
                    />
                  </Grid>

                  <Grid
                    item
                    display={"flex"}
                    justifyContent={"space-between"}
                    marginBottom={".5rem"}
                  >
                    <Typography fontSize={"18px"} alignSelf={"center"}>
                      Notify me when a session is confirmed
                    </Typography>
                    <FormControlLabel
                      control={
                        <IOSSwitch
                          checked={checkedSessionConfirmed}
                          onChange={handleSessionConfirmed}
                        />
                      }
                    />
                  </Grid>

                  <Grid
                    item
                    display={"flex"}
                    justifyContent={"space-between"}
                    marginBottom={".5rem"}
                  >
                    <Typography fontSize={"18px"} alignSelf={"center"}>
                      Notify me when a mentee cancels a session
                    </Typography>
                    <FormControlLabel
                      control={
                        <IOSSwitch
                          checked={checkedSessionCanc}
                          onChange={handleSessionCanc}
                        />
                      }
                    />
                  </Grid>

                  <Grid
                    item
                    display={"flex"}
                    justifyContent={"space-between"}
                    marginBottom={".5rem"}
                  >
                    <Typography fontSize={"18px"} alignSelf={"center"}>
                      Notify me 15 minutes before a session
                    </Typography>
                    <FormControlLabel
                      control={
                        <IOSSwitch
                          checked={checked15Min}
                          onChange={handle15Min}
                        />
                      }
                    />
                  </Grid>

                  <Grid
                    item
                    display={"flex"}
                    justifyContent={"space-between"}
                    marginBottom={".5rem"}
                  >
                    <Typography fontSize={"18px"} alignSelf={"center"}>
                      Notify me 60 minutes before a session
                    </Typography>
                    <FormControlLabel
                      control={
                        <IOSSwitch
                          checked={checked60Min}
                          onChange={handle60Min}
                        />
                      }
                    />
                  </Grid>

                  <Box sx={{ marginTop: "4rem" }}></Box>
                </Grid>
              </Grid>
            </Grid>
            <Box marginLeft={"1rem"}>
              <TimeSlot
                token={token}
                setRefreshAvailabilities={setRefreshAvailabilities}
              />
            </Box>
          </Box>
          <CurrentAvailabilities
            token={token}
            pk={pk}
            setAuth={setAuth}
            refreshAvailabilities={refreshAvailabilities}
            setRefreshAvailabilities={setRefreshAvailabilities}
          />
        </Box>
      </Stack>
        <Survey/>
    </Box>
  );
}
