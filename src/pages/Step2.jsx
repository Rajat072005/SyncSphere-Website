import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import "../styling/step2.css"; 
import { useDispatch, useSelector } from 'react-redux';
import { setStep2 } from '../features/slice/userSlice';

const companyRegex = /^.{2,}$/;
const industryRegex = /^[a-zA-Z\s]{3,}$/;
const teamRegex = /^[1-9][0-9]*$/;

export default function Step2() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.user);

  const [company, setCompany] = useState(user.company || "");
  const [industry, setIndustry] = useState(user.industry || "");
  const [team, setTeam] = useState(user.team || "");
  const [touched, setTouched] = useState({ company: false, industry: false, team: false });

  React.useEffect(() => {
    setCompany(user.company || "");
    setIndustry(user.industry || "");
    setTeam(user.team || "");
  }, [user]);

  const companyValid = companyRegex.test(company);
  const industryValid = industryRegex.test(industry);
  const teamValid = teamRegex.test(team);
  const allValid = companyValid && industryValid && teamValid;

  const handleNext = () => {
    if (!allValid) return;
    dispatch(setStep2({ company, industry, team }));
    localStorage.setItem('userData', JSON.stringify({ ...user, company, industry, team }));
    navigate("/step3");
  };

  return (
    <div className='step1'>
      <h2 id='Step1'>Step 2: Business Info</h2>
      <div style={{ flex: 1, width: "100%" }}>
        <div>
          <h3 id='company-tag'>
            Company Name
            <span
              title="Enter your company's full name. Abbreviations are fine, but don't leave it blank!"
              style={{ color: "#2563eb", cursor: "help", fontSize: 18, marginLeft: 4 }}
            >&#9432;</span>
          </h3>
          <input
            value={company}
            onChange={e => setCompany(e.target.value)}
            onBlur={() => setTouched(t => ({ ...t, company: true }))}
            id='company'
            placeholder="e.g. Acme Corp"
          />
          {touched.company && !companyValid && (
            <div className="error-message">
              Company name must be at least 2 characters.
            </div>
          )}
          <div className="helper-message">
            Tip: If you’re a freelancer, just use your name!
          </div>
        </div>

        <div>
          <h3 id='industry-tag'>
            Industry
            <span
              title="What sector does your company belong to? e.g. Technology, Healthcare, Education..."
              style={{ color: "#2563eb", cursor: "help", fontSize: 18, marginLeft: 4 }}
            >&#9432;</span>
          </h3>
          <input
            value={industry}
            onChange={e => setIndustry(e.target.value)}
            onBlur={() => setTouched(t => ({ ...t, industry: true }))}
            id='industry'
            placeholder="e.g. Technology"
          />
          {touched.industry && !industryValid && (
            <div className="error-message">
              Industry must be at least 3 letters and only letters/spaces.
            </div>
          )}
          <div className="helper-message">
            Confused? Just describe what your company does!
          </div>
        </div>

        <div>
          <h3 id='team-tag'>
            Team Size
            <span
              title="How many people are in your team? Enter a number (e.g. 5)."
              style={{ color: "#2563eb", cursor: "help", fontSize: 18, marginLeft: 4 }}
            >&#9432;</span>
          </h3>
          <input
            value={team}
            onChange={e => setTeam(e.target.value)}
            onBlur={() => setTouched(t => ({ ...t, team: true }))}
            id='team'
            placeholder="e.g. 5"
          />
          {touched.team && !teamValid && (
            <div className="error-message">
              Please enter a valid team size (positive number).
            </div>
          )}
          <div className="helper-message">
            Solo? Just enter 1. Got a big team? Enter the total number!
          </div>
        </div>
      </div>
      <div className="buttons" style={{ marginTop: "32px", marginBottom: "0" }}>
        <button id='backButton' onClick={() => navigate("/step1")}>Back</button>
        <button
          id='nextButton'
          onClick={handleNext}
          disabled={!allValid}
        >
          Next
        </button>
      </div>
      {!allValid && (touched.company || touched.industry || touched.team) && (
        <div className="alert-message">
          <span style={{ fontSize: 18 }}>⚠️</span>
          Please fill all fields correctly before proceeding.
        </div>
      )}
    </div>
  );
}
