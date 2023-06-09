// This component is a button that allows the user to cancel a session
//                   <CancelSessionButton>

import { Button } from "@mui/material";
import axios from "axios";

export default function CancelSessionButton({ token, sessionPK, onSessionCancelled }) {
  const handleCancel = () => {
    axios
      .patch(
        `${process.env.REACT_APP_BE_URL}/sessionrequest/${sessionPK}/`,
        { status: "Canceled" },
        {
          headers: { Authorization: `Token ${token}` },
        }
      )
      .then((res) => {
        // Upon successful cancellation, notify parent component
        if (onSessionCancelled) {
          onSessionCancelled(sessionPK);
        }
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
      onClick={handleCancel}
    >
      Cancel
    </Button>
  );
}