import { Box, Button, Snackbar } from "@mui/material";
import Alert from "@mui/material/Alert";

const SubmitButton = ({ handleSubmitSession, openSnackbar, handleCloseSnackbar, issue }) => {
  return (
    <>
      <Button
        variant="contained"
        onClick={handleSubmitSession}
        sx={{ justifyContent: "center", backgroundColor: "#0EC202" }}
      >
        Request
      </Button>
      {issue ? (
        <Alert className="errorPassword">
          A session with this mentor is already scheduled during this time.
        </Alert>
      ) : (
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity="success"
            sx={{ width: "100%" }}
          >
            Session Requested!
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default SubmitButton;
