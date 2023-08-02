import { useState, useEffect } from "react";
import axios from "axios";
import ProfileBasicInfo from "./ProfileBasicInfo";
import { Avatar, Typography, Grid, Box } from "@mui/material";
import { Switch } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import { styled } from "@mui/material/styles";

export default function ProfileMentee({ token, pk, setAuth }) {
  // first name, last name, phone number
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [teamNumber, setTeamNumber] = useState("");

  // track notification switch settings
  // set up similarly to https://webdevassist.com/reactjs-materialui/material-ui-switch
  const [checkedSessionConf, setCheckedSessionConf] = useState(false);
  const [checkedSessionCanc, setCheckedSessionCanc] = useState(false);
  const [checked15Min, setChecked15Min] = useState(false);
  const [checked60Min, setChecked60Min] = useState(false);

  // custom switch styling like iOS
  const IOSSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
          opacity: 1,
          border: 0,
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.5,
        },
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: '#33cf4d',
        border: '6px solid #fff',
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color:
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
      },
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 22,
      height: 22,
    },
    '& .MuiSwitch-track': {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500,
      }),
    },
  }));


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
    axios
      .get(`${process.env.REACT_APP_BE_URL}/notificationsettings/${pk}/`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        setCheckedSessionConf(res.data.session_confirmed);
        setCheckedSessionCanc(res.data.session_canceled);
        setChecked15Min(res.data.fifteen_minute_alert);
        setChecked60Min(res.data.sixty_minute_alert);
      });
  }, [token, pk]);

  // handle Switch functionality
  const handleSessionConf = (event) => {
    setCheckedSessionConf(event.target.checked);
    axios
      .patch(`${process.env.REACT_APP_BE_URL}/notificationsettings/${pk}/`, {
        session_confirmed: event.target.checked,
      },
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        });
  }

  const handleSessionCanc = (event) => {
    setCheckedSessionCanc(event.target.checked);
    axios
      .patch(`${process.env.REACT_APP_BE_URL}/notificationsettings/${pk}/`, {
        session_canceled: event.target.checked,
      },
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        });
  }

  const handle15Min = (event) => {
    setChecked15Min(event.target.checked);
    axios
      .patch(`${process.env.REACT_APP_BE_URL}/notificationsettings/${pk}/`, {
        fifteen_minute_alert: event.target.checked,
      },
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        });
  }

  const handle60Min = (event) => {
    setChecked60Min(event.target.checked);
    axios
      .patch(`${process.env.REACT_APP_BE_URL}/notificationsettings/${pk}/`, {
        sixty_minute_alert: event.target.checked,
      },
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        });
  }


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

                {/* Commenting out notification options until we're ready to use them */}
                <Grid item>
                  <Typography fontSize={"18px"} paddingTop={".75rem"} color={"#CCCCCC"}>
                    Notify me 15 minutes before a session
                  </Typography>
                </Grid>
                {/* <Grid item>
                  <Typography fontSize={"18px"} paddingTop={".75rem"}>
                    Notify me 60 minutes before a session
                  </Typography>
                </Grid> */}
              </Grid>
            </Grid>
            <Grid marginRight={"2rem"}>
              <Typography variant="h6">Email Notifications</Typography>

              <Grid item textAlign={"center"}>
                <FormControlLabel control={<IOSSwitch checked={checkedSessionConf} onChange={handleSessionConf} />} />
                <Grid item marginTop={"1rem"}>
                  <FormControlLabel control={<IOSSwitch checked={checkedSessionCanc} onChange={handleSessionCanc} />} />
                </Grid>
                <Grid item marginTop={"1rem"}>
                  <FormControlLabel disabled control={<IOSSwitch checked={checked15Min} onChange={handle15Min} />} />
                </Grid >
                {/* <Grid item>
                  <FormControlLabel control={<Switch checked={checked60Min} onChange={handle60Min} />} />
                </Grid> */}
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
