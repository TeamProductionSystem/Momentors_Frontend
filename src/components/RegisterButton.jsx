import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import PacmanLoader from "react-spinners/PacmanLoader";
import { useState } from "react";

export default function RegisterButton({ loading }) {
  const [isHovered, setIsHovered] = useState(false);

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
        sx={{
          width: "6.8125rem",
          height: "2.8125rem",
          marginLeft: { xs: 1, sm: 5 },
          marginTop: { xs: 2, sm: 10 },
          alignItems: "center",
          borderRadius: "0.25rem",
          background: "rgba(216, 216, 216, 0.90)",
          fontSize: isHovered ? '2rem' : '1rem',
        }}
      >
        {isHovered ? '🫶' : 'Register'}
      </Button>
      {loading && <PacmanLoader size={12} color="yellow" />}
    </>
  );
}
