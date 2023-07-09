import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import PacmanLoader from "react-spinners/PacmanLoader";
import { useState } from "react";

export default function LoginButton({ loading }) {
  const [isHovered, setIsHovered] = useState(false);
  // This was created to handle the hover state of the Sign In button.
  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };

  return (
    <>
      <Button
        size="large"
        type="submit"
        component={Link}
        to="/login"
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        sx={{
          width: "6.8125rem",
          height: "2.8125rem",
          marginTop: { xs: 2, sm: 10 },
          alignItems: "center",
          borderRadius: "0.25rem",
          background: "rgba(216, 216, 216, 0.90)",
          fontSize: isHovered ? "2rem" : "1rem",
        }}
      >
        {/* If the user is hovering over the button, 
        it will show them a friendly hand highfive. 
        If not, it will just say "Sign In". */}
        {isHovered ? "🙌" : "Sign In"}
      </Button>
      {/* Fun Pacman Loader if the app takes to long to load the page */}
      {loading && <PacmanLoader size={12} color="yellow" />}
    </>
  );
}
