import { useNavigate } from 'react-router-dom';
import "../styling/step1.css"; 
import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';
import { setStep1 } from '../features/slice/userSlice'

const nameRegex = /^[a-zA-Z\s]{3,}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Step1() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.user);

  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [touched, setTouched] = useState({ name: false, email: false });

  
  const nameValid = nameRegex.test(name);
  const emailValid = emailRegex.test(email);
  const allValid = nameValid && emailValid;

  React.useEffect(() => {
    setName(user.name || "");
    setEmail(user.email || "");
  }, [user]);

  const handleNext = () => {
    if (!allValid) return;
    dispatch(setStep1({ name, email }));
    localStorage.setItem('userData', JSON.stringify({ ...user, name, email }));
    navigate("/step2");
  };

  return (
    <div className='step1'>
      <h2 id='Step1'>Step 1: Personal Info</h2>

      <div>
        <h3 id='name-tag'>
          Name
          <span
            title="Enter your full name. Only letters and spaces allowed."
            style={{ color: "#2563eb", cursor: "help", fontSize: 18, marginLeft: 4 }}
          >&#9432;</span>
        </h3>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          onBlur={() => setTouched(t => ({ ...t, name: true }))}
          id='name'
          placeholder="e.g. John Doe"
        />
        {touched.name && !nameValid && (
          <div className="error-message">
            Name must be at least 3 letters and contain only letters and spaces.
          </div>
        )}
        <div className="helper-message">
          Tip: Nicknames or numbers won't work here!
        </div>
      </div>

      <div>
        <h3 id='email-tag'>
          Email Address
          <span
            title="Enter a valid email address. We'll send you a magic link!"
            style={{ color: "#2563eb", cursor: "help", fontSize: 18, marginLeft: 4 }}
          >&#9432;</span>
        </h3>
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          onBlur={() => setTouched(t => ({ ...t, email: true }))}
          id='email'
          placeholder="e.g. john@example.com"
        />
        {touched.email && !emailValid && (
          <div className="error-message">
            Please enter a valid email address (like john@example.com).
          </div>
        )}
        <div className="helper-message">
          Confused? Try your work or personal email, but don't use "test@test".
        </div>
      </div>

      <div className="buttons">
        <div style={{ flex: 1 }}></div>
        <button
          id='nextButton'
          onClick={handleNext}
          disabled={!allValid}
        >
          Next
        </button>
      </div>

      {!allValid && (touched.name || touched.email) && (
        <div className="alert-message">
          <span style={{ fontSize: 18 }}>⚠️</span>
          Please fill all fields correctly before proceeding.
        </div>
      )}
    </div>
  );
}
