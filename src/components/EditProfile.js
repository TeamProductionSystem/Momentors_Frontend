import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TextField, FormLabel, Input, Button } from "@mui/material";
import { Stack } from "@mui/system";
import PacmanLoader from "react-spinners/PacmanLoader";

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
  }, [token]);

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

    axios
      .patch(`${process.env.REACT_APP_BE_URL}/myprofile/`, formData, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "multipart/form-data",
        },
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
              placeholder={phoneNumber || "Phone Number"}
              InputLabelProps={{
                shrink: true,
              }}
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
              <TextField
                label="Skills"
                placeholder={skills || "Skills"}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => setSkills(e.target.value)}
              ></TextField>
            </Stack>
          )}

          {isMentor && (
            <Stack item="true" className="field">
              <TextField
                label="About Me"
                placeholder={aboutMe || "About Me"}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => setAboutMe(e.target.value)}
              ></TextField>
            </Stack>
          )}

          {isMentee && (
            <Stack item="true" className="field">
              <TextField
                label="Team Number"
                placeholder={teamNumber || "Team Number"}
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
