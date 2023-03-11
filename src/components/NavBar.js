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
            borderColor='gray.400'>Sessions</Button>
          </Link>
          <Link to="/profile">
            <Button
            border='2px'
            borderColor='gray.400'>Profile</Button>
          </Link>
        </ButtonGroup>
      </div>
      <div className="nav--title-container">
        <h1 className="nav--title">Momentum Mentors</h1>
      </div>
      <div className="nav--authentication">
        {!isLoggedIn ? (
          <ButtonGroup>
            <Link to="/register">
              <Button
              border='2px'
              borderColor='green.500'>Sign up</Button>
            </Link>
            <Link to="/login">
              <Button
              border='2px'
              borderColor='green.500'>Log in</Button>
            </Link>
          </ButtonGroup>
        ) : (
          <Link to="/" onClick={handleLogout}>
            <Button 
            border='2px'
            borderColor='red.200'
            className="button--logout">Log out</Button>
          </Link>
        )}
      </div>

    </nav>
  );
};

export default NavBar;