import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Stack } from "@mui/system";
import { TextField, Typography } from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';

export default function SessionForm({ token, pk, setAuth }) {
  const [project, setProject] = useState("");
  const [helptext, setHelptext] = useState("");
  const [gitlink, setGitlink] = useState("");

  const navigate = useNavigate();

  // useEffect(() => {
  //   axios
  //     .post(`${process.env.REACT_APP_BE_URL}/session/`, {
  //       headers: { Authorization: `Token ${token}` },
  //       project: project,
  //       helptext: helptext,
  //       gitlink: gitlink,
  //     })
  //     .then((res) => {
  //       console.log(res);
  //       navigate("/menteesessions");
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // }, [token, project, helptext, gitlink]);

  return (
    <Box
      className="sessionform"
      display="flex"
      justifyContent="center"
      alignItems="center"
      marginTop={"1rem"}
    >
      <Stack spacing={2} width={"50vw"}>
    <Typography variant="h4">Session Form</Typography>
        <Stack item="1">
          <TextField
            id="git_project"
            label="Name of Project"
            variant="outlined"
          ></TextField>
        </Stack>
        <Stack item="2">
          <TextField
            id="help_text"
            label="What do you need help with?"
            variant="outlined"
          ></TextField>
        </Stack>
        <Stack item="3">
          <TextField
            id="git_link"
            label="Link to Project"
            variant="outlined"
          ></TextField>
        </Stack>
      </Stack>
    </Box>
  );
}
