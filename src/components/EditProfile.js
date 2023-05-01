import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TextField, FormLabel, Input, Button } from "@mui/material";
import { Stack } from "@mui/system";
import PacmanLoader from "react-spinners/PacmanLoader";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

export default function EditProfile({ token, pk, setAuth }) {
  const [error, setError] = useState("");
  const [userName, setUserName] = useState("");
  const [originalProfile, setOriginalProfile] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState("");
  const [skills, setSkills] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [teamNumber, setTeamNumber] = useState("");
  const [isMentor, setIsMentor] = useState("");
  const [isMentee, setIsMentee] = useState("");
  const navigate = useNavigate();
  // Append +1 to phone number if it's not already present
  const formattedPhoneNumber = phoneNumber?.startsWith("+1")
    ? phoneNumber
    : `+1${phoneNumber}`;

  const skillsChoices = [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Python",
    "Django",
    "Django REST",
  ];

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_BE_URL}/myprofile/`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        setLoading(false);
        setOriginalProfile(res.data);
        setFirstName(res.data.first_name);
        setLastName(res.data.last_name);
        setPhoneNumber(res.data.phone_number);
        setIsMentor(res.data.is_mentor);
        setIsMentee(res.data.is_mentee);
        console.log(res.data);
        // navigate("/profile");
      })
      .catch((e) => {
        setLoading(false);
        setError(e.message);
      });
    axios
      .get(`${process.env.REACT_APP_BE_URL}/mentorinfo/`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        setSkills(res.data[0].skills);
        setAboutMe(res.data[0].about_me);
        console.log(res.data);
      });
  }, [token]);

  const [skillChoice, setSkillChoice] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSkillChoice(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const editProfile = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData();
    if (firstName !== originalProfile.first_name) {
      formData.append("first_name", firstName);
    }
    if (lastName !== originalProfile.last_name) {
      formData.append("last_name", lastName);
    }
    if (phoneNumber !== originalProfile.phone_number) {
      formData.append("phone_number", formattedPhoneNumber);
    }
    // formData.append("profile_photo", profilePhoto);

    const skillsObject = {
      skills: skillChoice,
    };

    axios
      .patch(`${process.env.REACT_APP_BE_URL}/myprofile/`, formData, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        axios.patch(
          `${process.env.REACT_APP_BE_URL}/mentorinfoupdate/`,
          JSON.stringify(skillsObject),
          {
            headers: {
              Authorization: `Token ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
      })

      .then((res) => {
        // const token = res.data.auth_token;
        axios
          .get(`${process.env.REACT_APP_BE_URL}/myprofile/`, {
            headers: { Authorization: `Token ${token}` },
          })
          .then((res) => {
            setLoading(false);
            console.log(res.data);
            navigate("/profile");
          })
          .catch((e) => {
            setLoading(false);
            setError(e.message);
          });
      })
      .catch((e) => {
        setLoading(false);
        setError(e.message);
      });
  };

  return (
    <div className="profile--edit">
      <form onSubmit={editProfile} id="edit-profile">
        <Stack container="true" justifyContent="center" alignItems="center">
          <Stack item="true" className="field">
            <TextField
              label="First Name"
              placeholder={firstName !== "" ? firstName : "First Name"}
              InputLabelProps={{
                shrink: true,
              }}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            ></TextField>
          </Stack>

          <Stack item="true" className="field">
            <TextField
              label="Last Name"
              placeholder={lastName !== "" ? lastName : "Last Name"}
              InputLabelProps={{
                shrink: true,
              }}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            ></TextField>
          </Stack>

          <Stack item="true" className="field">
            <TextField
              label="Phone Number"
              placeholder={phoneNumber !== "" ? phoneNumber : "Phone Number"}
              InputLabelProps={{
                shrink: true,
              }}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            ></TextField>
          </Stack>

          <Stack item="true" className="field">
            <FormLabel>Profile Photo</FormLabel>
            <TextField
              type="file"
              onChange={(e) => setProfilePhoto(e.target.files[0])}
            ></TextField>
          </Stack>

          {isMentor && (
            <Stack item="true" className="field">
              <InputLabel id="demo-multiple-checkbox-label">Skills</InputLabel>
              <Select
                multiple
                value={skillChoice}
                onChange={handleChange}
                input={<OutlinedInput label="Tag" />}
                renderValue={(selected) => selected.join(", ")}
                // MenuProps={MenuProps}
              >
                {skillsChoices.map((skill) => (
                  <MenuItem key={skill} value={skill}>
                    <Checkbox checked={skillChoice.indexOf(skill) > -1} />
                    <ListItemText primary={skill} />
                  </MenuItem>
                ))}
              </Select>
              {/* <TextField
                label="Skills"
                placeholder={skills !== [] ? skills : "Skills"}
                InputLabelProps={{
                  shrink: true,
                }}
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
              ></TextField> */}
            </Stack>
          )}

          {isMentor && (
            <Stack item="true" className="field">
              <TextField
                multiline
                rows={3}
                maxRows={5}
                label="About Me"
                placeholder={aboutMe !== "" ? aboutMe : "About Me"}
                InputLabelProps={{
                  shrink: true,
                }}
                value={aboutMe}
                onChange={(e) => setAboutMe(e.target.value)}
              ></TextField>
            </Stack>
          )}

          {isMentee && (
            <Stack item="true" className="field">
              <TextField
                label="Team Number"
                placeholder={teamNumber !== "" ? teamNumber : "Team Number"}
                InputLabelProps={{
                  shrink: true,
                }}
                value={teamNumber}
                onChange={(e) => setTeamNumber(e.target.value)}
              ></TextField>
            </Stack>
          )}

          <Stack item="true" className="button--edit-profile">
            {loading ? (
              <Button
                id="loading--button"
                spinner={<PacmanLoader size={20} color="yellow" />}
              >
                loading...
              </Button>
            ) : (
              <Button type="submit" form="edit-profile" variant="outlined">
                Save changes
              </Button>
            )}
          </Stack>
        </Stack>
      </form>
    </div>
  );
}
