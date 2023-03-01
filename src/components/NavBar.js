import { ButtonGroup, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const NavBar = ({ handleLogout, isLoggedIn }) => {
  return (
    <nav className="nav" role="navigation">
      <div className="nav--navigation">
        <ButtonGroup>
          <Link to="/sessions">
            <Button 
            border='2px'
            borderColor='gray.500'>Sessions</Button>
          </Link>
          <Link to="/profile">
            <Button
            border='2px'
            borderColor='gray.500'>Profile</Button>
          </Link>
        </ButtonGroup>
      </div>
      <div className="nav--title-container"> </div>
        <h1 className="nav--title">Momentum Mentors</h1>
     
      <div className="nav--authentication">
        {!isLoggedIn ? (
          <ButtonGroup>
            <Link to="/register">
              <Button>Sign up</Button>
            </Link>
            <Link to="/login">
              <Button>Log in</Button>
            </Link>
          </ButtonGroup>
        ) : (
          <Link to="/" onClick={handleLogout}>
            <Button>Log out</Button>
          </Link>
        )}
      </div>

    </nav>
  );
};

export default NavBar;