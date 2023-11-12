// This component is for surveys on how to make the app better.
// It's currently not being used, but it's here if needed in the future.

import { Sidetab } from "@typeform/embed-react";

export default function Survey() {
  const survey_username = localStorage.getItem("momentorsUserName");

  return (
    <Sidetab
      id={process.env.REACT_APP_WEBSITE_FEEDBACK_FORM}
      buttonText="click to open"
      hidden={survey_username}
    />
  );
}
