import { Box, Button, Grid, Typography, Chip } from "@mui/material";

export default function MenteeSessions(token, pk, setAuth) {
  return (
    <Box className="menteesessions--page">
      <Typography
        variant="h2"
        component="div"
        sx={{
          flexGrow: 1,
          textAlign: "center",
          marginTop: "2rem",
          textDecoration: "underline",
        }}
      >
        Mentee Session
      </Typography>

      <Typography
        variant="h2"
        component="div"
        sx={{ flexGrow: 1, marginTop: "4rem", padding: "1rem" }}
      >
        Request:
      </Typography>
      <Box margin={"1rem"}>
        <hr style={{ color: "black" }} />
      </Box>
      <Box>
        <Grid
          container
          sx={{
            flexGrow: 1,
            marginLeft: "1rem",
            fontSize: "25px",
            textAlign: "center",
          }}
        >
          <Grid item xs={3}>
            <Box>Name:</Box>
          </Grid>
          <Grid item xs={3}>
            <Box>Date:</Box>
          </Grid>
          <Grid item xs={3}>
            <Box>Time:</Box>
          </Grid>
          <Grid item xs={3}>
            <Box>Status:</Box>
          </Grid>
        </Grid>
        <Grid
          container
          sx={{
            flexGrow: 1,
            marginLeft: "1rem",
            marginTop: "1.75rem",
            fontSize: "25px",
            textAlign: "center",
          }}
        >
          <Grid item xs={3}>
            <Box>Bob</Box>
          </Grid>
          <Grid item xs={3}>
            <Box>3/7/2020</Box>
          </Grid>
          <Grid item xs={3}>
            <Box>11:00am</Box>
          </Grid>
          <Grid item xs={3}>
            <Chip
            label="Waiting on Mentor"
              variant="outlined"
              color="warning"
              size="md"
              sx={{ margin: ".25rem" }}
            >
            </Chip>
          </Grid>
        </Grid>
        <Typography
          variant="h2"
          component="div"
          sx={{ flexGrow: 1, marginTop: "4rem", padding: "1rem" }}
        >
          Scheduled:
        </Typography>
        <Box margin={"1rem"}>
          <hr style={{ color: "black" }} />
        </Box>
        <Grid
          container
          sx={{
            flexGrow: 1,
            marginLeft: "1rem",
            fontSize: "25px",
            textAlign: "center",
          }}
        >
          <Grid item xs={3}>
            <Box>Name:</Box>
          </Grid>
          <Grid item xs={3}>
            <Box>Date:</Box>
          </Grid>
          <Grid item xs={3}>
            <Box>Time:</Box>
          </Grid>
          <Grid item xs={3}>
            <Box>Status:</Box>
          </Grid>
        </Grid>
        <Grid
          container
          sx={{
            flexGrow: 1,
            marginLeft: "1rem",
            marginTop: "1.75rem",
            fontSize: "25px",
            textAlign: "center",
          }}
        >
          <Grid item xs={3}>
            <Box>Bob</Box>
          </Grid>
          <Grid item xs={3}>
            <Box>3/7/2020</Box>
          </Grid>
          <Grid item xs={3}>
            <Box>11:00am</Box>
          </Grid>
          <Grid item xs={3}>
            <Chip
            label="Confirmed"
              variant="outlined"
              color="success"
              size="md"
              sx={{ margin: ".25rem" }}
            >
            </Chip>
            <Button
              variant="outlined"
              color="error"
              size="md"
              sx={{ margin: ".25rem" }}
            >
              Cancele
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
