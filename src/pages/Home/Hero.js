import yoda from "../../assets/mentor-yoda.jpeg";

export default function Hero() {
  return (
    <div className="hero">
      <div className="hero--content">
        <h1 className="hero--title">Welcome to Momentum Mentors</h1>
        <p className="hero--subtitle">
          Find a mentor to help achieve your goals and a Master you will
          become...
        </p>
        <h4 className="hero--note">
          ** As we continue to refine our Beta version, we recommend using
          Google Chrome for the best experience. Please also allow for some
          extra time, as server response may be slower than usual during this
          period. We appreciate your patience and understanding. Improved
          cross-platform compatibility and performance enhancements are on their
          way! **
        </h4>
      </div>
      <img className="hero--yoda" src={yoda} alt="the best mentor he is yoda" />
    </div>
  );
}
