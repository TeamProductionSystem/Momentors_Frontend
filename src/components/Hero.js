import yoda from '../mentor-yoda.jpeg';
import { Button, ButtonGroup } from '@chakra-ui/react'

export default function Hero() {
  return (
    <div className="hero">
      <div className="hero--content">
        <h1 className="hero--title">Welcome to Momentum Mentors</h1>
        <p className="hero--subtitle">Find the mentor you need to achieve your goals. A Master you will become</p>
      </div>
      <img className="hero--yoda" src={yoda} alt="the best mentor he is yoda"/>
        <div className="hero--authentication">
          <ButtonGroup variant='solid' size="md">
            <Button>Log in</Button>
            <Button>Sign up</Button>
          </ButtonGroup>
        </div>
    </div>
  );
};
