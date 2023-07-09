import { Box, Grid, Typography } from "@mui/material";
import yoda from "../../assets/mentor-yoda.jpeg";
import LoginButton from "../../components/LoginButton";
import RegisterButton from "../../components/RegisterButton";

export default function Hero() {
  return (
    <Box
      sx={{
        backgroundColor: "#1F1F1F",
        p: 2,
        minHeight: "100vh",
      }}
    >
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Typography
            variant="h3"
            sx={{
              color: "#808080",
              textAlign: "center",
              fontFamily: "Roboto",
              fontSize: { xs: "2rem", sm: "3.25rem" },
              fontWeight: "400",
              lineHeight: "116.7%",
              mt: { xs: 2, sm: 30 },
              ml: { xs: 2, sm: 6 },
              width: "85%",
            }}
          >
            Find a mentor to help achieve your goals and a Master you will
            become...
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <LoginButton />
            <RegisterButton />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              mt: { xs: 2, sm: 25 },
              mr: { xs: 2, sm: 6 },
            }}
          >
            <img
              src={yoda}
              alt="the best mentor he is yoda"
              style={{
                width: "100%",
                objectFit: "cover",
                borderRadius: "6.0625rem",
              }}
            />
          </Box>
        </Grid>
      </Grid>
      <Typography
        sx={{
          color: "rgba(216, 216, 216, 0.90)",
          textAlign: "center",
          fontFamily: "Roboto",
          fontSize: "1rem",
          fontWeight: "400",
          lineHeight: "150%",
          letterSpacing: "0.00938rem",
          marginTop: { xs: 2, sm: 15 },
          marginLeft: { xs: 1, sm: 8 },
          marginRight: { xs: 1, sm: 8 },
        }}
      >
        ** As we continue to refine our Beta version, we recommend using Google
        Chrome for the best experience. Please also allow for extra time, as
        server response may be slower than usual during this period. We
        appreciate your patience and understanding. Improved cross-plateform
        compatibility and performance enhancements are on the way! **
      </Typography>
    </Box>
  );
}
