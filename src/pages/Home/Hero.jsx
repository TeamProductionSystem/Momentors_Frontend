import { Box, Grid, Typography } from "@mui/material";
import yoda from "../../assets/mentor-yoda.jpeg";

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
            h3
            sx={{
              border: "1px solid #808080",
              color: "#808080",
              textAlign: "center",
              fontFamily: "Roboto",
              fontSize: { xs: "2rem", sm: "3.25rem" },
              fontWeight: "400",
              lineHeight: "116.7%",
              mt: { xs: 2, sm: 35 },
              ml: { xs: 1, sm: 5 },
              width: "85%",
            }}
          >
            Find a mentor to help achieve your goals and a Master you will
            become...
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box sx={{ mt: { xs: "2rem", sm: "12.38rem" } }}>
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
    </Box>
  );
}
