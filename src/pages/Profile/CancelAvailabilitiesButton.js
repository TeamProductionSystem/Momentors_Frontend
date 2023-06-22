// This component is a button that allows the user to cancel an availability

import React from "react";
import axios from "axios";
import { Button } from "@mui/material";

const CancelAvailabilityButton = ({
  availabilityPK,
  token,
  setRefreshAvailabilities,
}) => {
  const handleClick = () => {
    axios
      .delete(
        `${process.env.REACT_APP_BE_URL}/availability/${availabilityPK}/`,
        {
          headers: { Authorization: `Token ${token}` },
        }
      )
      .then((res) => {
        // Upon successful cancellation, notify parent component
        setRefreshAvailabilities(true);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  return (
    <Button
      variant="outlined"
      color="error"
      size="md"
      sx={{ margin: ".25rem" }}
      onClick={handleClick}
    >
      Cancel
    </Button>
  );
};

export default CancelAvailabilityButton;
