import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TextField, FormLabel, Input, Button } from "@mui/material";
import { Stack } from "@mui/system";
import PacmanLoader from "react-spinners/PacmanLoader";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";

export default function EditProfile({ token, pk, setAuth }) {
  const [error, setError] = useState("");
  const [userName, setUserName] = useState("");
  const [originalProfile, setOriginalProfile] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState("");
  const [skills, setSkills] = useState([]);
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

        if (res.data.is_mentor) {
          axios
            .get(`${process.env.REACT_APP_BE_URL}/mentorinfo/`, {
              headers: { Authorization: `Token ${token}` },
            })
            .then((res) => {
              setSkills(res.data[0].skills);
              setAboutMe(res.data[0].about_me);
            })
            .catch((e) => {
              console.error(e);
            });
        } else if (res.data.is_mentee) {
          axios
            .get(`${process.env.REACT_APP_BE_URL}/menteeinfo/`, {
              headers: { Authorization: `Token ${token}` },
            })
            .then((res) => {
              setTeamNumber(res.data[0].team_number);
            })
            .catch((e) => {
              console.error(e);
            });
        }
      })
      .catch((e) => {
        setLoading(false);
        setError(e.message);
      });
  }, [token]);

  const handleChange = (event) => {
    const { value: selectedValue } = event.target;
    setSkills((prevSkills) => {
      const isSelected = prevSkills.includes(selectedValue);
      return isSelected
        ? prevSkills.filter((skill) => skill !== selectedValue)
        : [...prevSkills, selectedValue];
    });
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
    if (profilePhoto) {
      formData.append("profile_photo", profilePhoto);
    }

    axios
      .patch(
        `${process.env.REACT_APP_BE_URL}/myprofile/`,
        formData && formData, // Only pass form data if it exists
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        if (skills && aboutMe) {
          axios.patch(
            `${process.env.REACT_APP_BE_URL}/mentorinfoupdate/`,
            {
              skills: skills,
              about_me: aboutMe,
            },
            {
              headers: {
                Authorization: `Token ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
        } else if (teamNumber) {
          axios.patch(
            `${process.env.REACT_APP_BE_URL}/menteeinfoupdate/`,
            {
              team_number: teamNumber,
            },
            {
              headers: {
                Authorization: `Token ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
        }
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
              placeholder={phoneNumber !== null ? phoneNumber : "Phone Number"}
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
              <InputLabel shrink htmlFor="select-multiple-native">
                Skills
              </InputLabel>
              <Select
                multiple
                native
                value={skills}
                onChange={handleChange}
                label="Skills"
              >
                {skillsChoices.map((skill) => (
                  <option key={skill} value={skill}>
                    {skill}
                  </option>
                ))}
              </Select>
            </Stack>
          )}

          {isMentor && (
            <Stack item="true" className="field">
              <TextField
                multiline
                rows={3}
                label="About Me"
                placeholder={aboutMe !== "About Me" ? aboutMe : "About Me"}
                InputLabelProps={{
                  shrink: true,
                }}
                value={aboutMe !== "About Me" ? aboutMe : null}
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
