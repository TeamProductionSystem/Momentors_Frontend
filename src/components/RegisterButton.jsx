import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { useState } from "react";

export default function RegisterButton() {
  const [isHovered, setIsHovered] = useState(false);
  // This was created to handle the hover state of the Register button.
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
        to="/register"
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        data-test="hero-register-button"
        sx={{
          width: "6.8125rem",
          height: "2.8125rem",
          alignItems: "center",
          borderRadius: "0.25rem",
          background: "rgba(216, 216, 216, 0.90)",
          fontSize: isHovered ? "2rem" : "1rem",
        }}
      >
        {/* If the user is hovering over the button, 
        it will show them a friendly hand heart. 
        If not, it will just say "Sign In". */}
        {isHovered ? "🫶" : "Register"}
      </Button>
    </>
  );
}
