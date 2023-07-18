import { Button, Snackbar } from "@mui/material";
import Alert from "@mui/material/Alert";

const SubmitButton = ({ handleSubmitSession, openSnackbar, handleCloseSnackbar }) => {
  return (
    <>
      <Button
        variant="contained"
        onClick={handleSubmitSession}
        sx={{ justifyContent: "center", backgroundColor: "#0EC202"  }}
      >
        Request
      </Button>
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
    </>
  );
};

export default SubmitButton;
