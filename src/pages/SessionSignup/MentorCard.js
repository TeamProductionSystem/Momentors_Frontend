import { useState, useEffect } from "react";
import axios from "axios";
import { Grid, Card, CardMedia, CardContent, Typography } from "@mui/material";

export default function MentorCard({ mentor }) {
  return (
    <>
      <Grid container alignItems="center" justifyContent="center">
        <Card sx={{ minWidth: 400, maxWidth: 400 }} elevation={4}>
          <CardMedia
            sx={{
              height: 400,
            }}
            image={mentor.profile_photo}
            title="Profile Photo"
          />
          <CardContent>
            <Typography gutterBottom>{mentor.about_me}</Typography>
            {/* Pull in bio from database */}
            <Typography>
              Skills: {mentor.skills}
              <br />
              firstName:
              {mentor.first_name}
              <br />
              lastName:
              {mentor.last_name}
            </Typography>
          </CardContent>
          {/* Pull in marked skills from database */}
        </Card>
      </Grid>
    </>
  );
}
