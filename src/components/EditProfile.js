import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TextField, FormLabel, Input, Button } from "@mui/material";
import { Stack } from "@mui/system";
import PacmanLoader from "react-spinners/PacmanLoader";

export default function EditProfile({ token, pk, setAuth }) {
  const [error, setError] = useState("");
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState("");
  const navigate = useNavigate();
  // Append +1 to phone number if it's not already present
  const formattedPhoneNumber = phoneNumber.startsWith("+1")
    ? phoneNumber
    : `+1${phoneNumber}`;

  const editProfile = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData();
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("phone_number", formattedPhoneNumber);
    formData.append("profile_photo", profilePhoto);

    axios
      .patch(
        `${process.env.REACT_APP_BE_URL}/myprofile/`,
        formData,
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
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
              label="first name"
              onChange={(e) => setFirstName(e.target.value)}
            >
              First name
            </TextField>
          </Stack>

          <Stack item="true" className="field">
            <TextField
              label="last name"
              onChange={(e) => setLastName(e.target.value)}
            >
              Last name
            </TextField>
          </Stack>

          <Stack item="true" className="field">
            <TextField
              label="phone number"
              onChange={(e) => setPhoneNumber(e.target.value)}
            >
              Phone number
            </TextField>
          </Stack>

          <Stack item="true" className="field">
            <FormLabel>Profile Photo</FormLabel>
            <TextField
              type="file"
              onChange={(e) => setProfilePhoto(e.target.files[0])}
            >
            </TextField>
          </Stack>

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
