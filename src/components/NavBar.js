import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import PacmanLoader from "react-spinners/PacmanLoader";

const NavBar = ({ handleLogout, isLoggedIn, token, loading }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const isMentor = sessionStorage.getItem("is_mentor") === "true";
  const isMentee = sessionStorage.getItem("is_mentee") === "true";

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar
          sx={{
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {!isLoggedIn ? (
            <></>
          ) : (
            <div>
              <IconButton
                size="large"
                edge="start"
                // color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleClose} component={Link} to="/profile">
                  Profile
                </MenuItem>
                {isMentor && (
                  <MenuItem
                    onClick={handleClose}
                    component={Link}
                    to="/mentorsessions"
                  >
                    Mentor Sessions
                  </MenuItem>
                )}
                {isMentee && (
                  <MenuItem
                    onClick={handleClose}
                    component={Link}
                    to="/menteesessions"
                  >
                    Mentee Sessions
                  </MenuItem>
                )}
                <MenuItem
                  onClick={handleClose}
                  component={Link}
                  to="/sessionsignup"
                >
                  Session Signup
                </MenuItem>
              </Menu>
            </div>
          )}

          <Typography variant="h3" component="div" sx={{ flexGrow: 1 }} data-test="Nav-Title">
            <p className="nav--title">Momentum Mentors</p>
          </Typography>

          <Box
            className="nav--authentication"
            sx={{
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {!isLoggedIn ? (
              <Box>
                <Button
                  size="large"
                  type="submit"
                  component={Link}
                  to="/register"
                  // color="inherit"
                >
                  Sign up
                </Button>

                <Button
                  size="large"
                  type="submit"
                  component={Link}
                  to="/login"
                  // color="inherit"
                >
                  Log in
                </Button>
              </Box>
            ) : (
              <Link to="/" onClick={handleLogout}>
                {loading ? (
                  <Button
                    id="loading--button"
                    style={
                      loading
                        ? { backgroundColor: "black", color: "yellow" }
                        : {}
                    }
                  >
                    <PacmanLoader size={12} color="yellow" />
                    {!loading && "Loading..."}
                  </Button>
                ) : (
                  <Button
                    id="logout--button"
                    onClick={handleLogout}
                    style={
                      loading
                        ? {
                            backgroundColor: "black",
                            color: "yellow",
                            width: "20px",
                          }
                        : {}
                    }
                  >
                    Logout
                  </Button>
                )}
              </Link>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
