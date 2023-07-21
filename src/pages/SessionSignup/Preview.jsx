// Component for previewing the session time prior to submitting the request.
import SubmitButton from "./SubmitButton";
import { Box, Button, Typography } from "@mui/material";

const Preview = ({
  selected,
  onCancel,
  openSnackbar,
  handleCloseSnackbar,
  handleSubmitSession,
  issue
}) => {
  return (
    <div>
      <Typography variant="h6" sx={{ textAlign: "center", minWidth: 200 }}>
        Confirm Session?
      </Typography>
      <Typography
        sx={{ marginTop: ".5rem", marginBottom: ".5rem", textAlign: "center" }}
      >
        {new Date(selected.start).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}{" "}
        -{" "}
        {new Date(selected.end).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <SubmitButton
          handleSubmitSession={handleSubmitSession}
          openSnackbar={openSnackbar}
          handleCloseSnackbar={handleCloseSnackbar}
          issue={issue}
        />
        <Button variant="outlined" onClick={onCancel}>
          Cancel
        </Button>
      </Box>
    </div>
  );
};

export default Preview;
