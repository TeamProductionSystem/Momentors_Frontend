// This component is for surveys on how to make the app better. 

import { Sidetab } from '@typeform/embed-react'

export default function Survey(){
  const survey_username = localStorage.getItem("momentorsUserName")
  
  const hidden_field = {
    username: survey_username
  }


  return (
    <Sidetab 
    id={process.env.REACT_APP_WEBSITE_FEEDBACK_FORM} 
    buttonText="click to open"
    hidden={survey_username}
    />
  )
}
