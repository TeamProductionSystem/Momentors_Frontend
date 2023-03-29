import { useState, useEffect } from "react";
import axios from "axios";
import ProfileBasicInfo from "./ProfileBasicInfo";
import { Grid, Card, CardMedia, CardContent, Typography } from "@mui/material";
import { maxHeight } from "@mui/system";
import MentorCard from "./MentorCard";

export default function ProfileMentor({ token, pk, setAuth }) {
  // first name, last name, phone number
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <div className="profile--page">
      <br />
      <MentorCard />
    </div>
  );
}
