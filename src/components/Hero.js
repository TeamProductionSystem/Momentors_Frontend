import yoda from '../mentor-yoda.jpeg';

export default function Hero() {
  return (
    <div className="hero">
      <div className="hero--content">
        <h1 className="hero--title">Welcome to Momentum Mentors</h1>
        <p className="hero--subtitle">Find a mentor to help achieve your goals and a Master you will become...</p>
      </div>
      <img className="hero--yoda" src={yoda} alt="the best mentor he is yoda"/>
    </div>
  );
};