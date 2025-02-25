import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Skills.css';

interface Skill {
  name: string;
  level: string;
}

const Skills: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios.get<Skill[]>('http://localhost:5000/api/skills')
      .then((response) => {
        setSkills(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching skills:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="skills-container">
      <h2>My Skills</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="skills-grid">
          {skills.map((skill, index) => (
            <li key={index} className="skill-card">
              <h3>{skill.name}</h3>
              <p>{skill.level}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Skills;