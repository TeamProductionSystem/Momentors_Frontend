import { Divider } from "@chakra-ui/react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function SessionSignup({token, pk}) {
  const [skills, setSkills] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState("");


  useEffect(() => {
    axios.get('https://team-production-system.onrender.com/mentor/', {
        headers: { Authorization: `Token ${token}` },
    })
      .then(response => {
        const skillsSet = new Set();
        response.data.forEach(mentor => {
          mentor.skills.forEach(skill => {
            skillsSet.add(skill);
          });
        });
        setSkills(Array.from(skillsSet));
      })
      .catch(error => {
        console.log(error);
      });
  }, [token, pk]);

  useEffect(() => {
    if (selectedSkill) {
      axios.get(`https://team-production-system.onrender.com/mentors/${selectedSkill}`, {
        headers: { Authorization: `Token ${token}` },
      })
    
        .then(response => {
          setMentors(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [selectedSkill, token, pk]);

  const handleSkillChange = event => {
    setSelectedSkill(event.target.value);
  };

  return (
    <div className="session--signup">
      <div className="session--signup-header">
        Meet a Mentor
      </div>
      <div className="session--signup-topic">
        <p>What do you want to learn about?</p>
        <select onChange={handleSkillChange}>
          <option value="">Select a skill</option>
          {skills.map(skill => (
            <option value={skill} key={skill}>
              {skill}
            </option>
          ))}
        </select>
      </div>
      {mentors.length > 0 && (
        <div className="session--signup-mentors">
          <p>Choose a mentor:</p>
          <ul>
            {mentors.map(mentor => (
              <li key={mentor.pk}>
                <Link to={`/mentor/${mentor.pk}`}>{mentor.username}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
