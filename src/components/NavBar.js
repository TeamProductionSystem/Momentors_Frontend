import { Button, ButtonGroup } from '@mui/material';
import { Navigate, useNavigate } from "react-router-dom";

const NavBar = ({ handleLogout, isLoggedIn }) => {

const navigate = useNavigate();

  return (
    <nav className="nav" role="navigation">
      <div className="nav--navigation">
      <ButtonGroup>
            <Button onClick={() => navigate("/sessions")}>Sessions</Button>
            <Button onClick={() => navigate("/profile")}>Profile</Button>
            <Button onClick={() => navigate("/sessionsignup")}>Session Signup</Button>
      </ButtonGroup>
      </div>
      <div className="nav--title-container">
        <h1 className="nav--title">Momentum Mentors</h1>
      </div>
      <div className="nav--authentication">
        {!isLoggedIn ? (
          <ButtonGroup>
              <Button onClick={() => navigate("/register")}>Sign up</Button>
              <Button onClick={() => navigate("/login")}>Log in</Button>
          </ButtonGroup>
        ) : (
            <Button onClick={() => handleLogout() } >Log out</Button>
        )}
      </div>

    </nav>
  );
};

export default NavBar;