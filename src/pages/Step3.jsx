import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import "../styling/step3.css";
import { useDispatch, useSelector } from 'react-redux';
import { setStep3 } from '../features/slice/userSlice';

const notificationOptions = ["Email", "SMS", "Push"];
const themeOptions = ["Light", "Dark", "System"];

export default function Step3() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  const [notification, setNotification] = useState(user.notification || "");
  const [theme, setTheme] = useState(user.theme || "");
  const [touched, setTouched] = useState({ notification: false, theme: false });

  useEffect(() => {
    setNotification(user.notification || "");
    setTheme(user.theme || "");
  }, [user]);

  const notificationValid = notificationOptions.includes(notification);
  const themeValid = themeOptions.includes(theme);
  const allValid = notificationValid && themeValid;

  const handleSubmit = () => {
    if (!allValid) return;
    dispatch(setStep3({ notification, theme }));
    const userData = { ...user, notification, theme };
    localStorage.setItem('userData', JSON.stringify(userData));
    navigate("/dashboard");
  };

  return (
    <div className='step1'>
      <h2 id='Step1'>Step 3: Preferences</h2>

      <div>
        <h3 id='notification-tag'>
          Notification Preferences
          <span
            title="How do you want to receive important updates?"
            style={{ color: "#2563eb", cursor: "help", fontSize: 18, marginLeft: 4 }}
          >&#9432;</span>
        </h3>
        <select
          id='notification'
          value={notification}
          onChange={e => {
            setNotification(e.target.value);
            setTouched(t => ({ ...t, notification: true }));
            dispatch(setStep3({ notification: e.target.value, theme }));
          }}
          onBlur={() => setTouched(t => ({ ...t, notification: true }))}
        >
          <option value="">Select notification method</option>
          {notificationOptions.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        {touched.notification && !notificationValid && (
          <div className="error-message">
            Please select a notification preference.
          </div>
        )}
        <div className="helper-message">
          Tip: Choose how you want to be disturbed! 📱
        </div>
      </div>

      <div>
        <h3 id='theme-tag'>
          Theme
          <span
            title="Pick your favorite look for the dashboard."
            style={{ color: "#2563eb", cursor: "help", fontSize: 18, marginLeft: 4 }}
          >&#9432;</span>
        </h3>
        <select
          id='theme'
          value={theme}
          onChange={e => {
            setTheme(e.target.value);
            setTouched(t => ({ ...t, theme: true }));
            dispatch(setStep3({ notification, theme: e.target.value }));
          }}
          onBlur={() => setTouched(t => ({ ...t, theme: true }))}
        >
          <option value="">Select theme</option>
          {themeOptions.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        {touched.theme && !themeValid && (
          <div className="error-message">
            Please select a theme.
          </div>
        )}
        <div className="helper-message">
          Confused? "System" will match your device settings!
        </div>
      </div>

      <div className="buttons">
        <button id='backButton' onClick={() => navigate("/step2")}>Back</button>
        <button
          id='nextButton'
          onClick={handleSubmit}
          disabled={!allValid}
        >
          Submit
        </button>
      </div>

      {!allValid && (touched.notification || touched.theme) && (
        <div className="alert-message">
          <span style={{ fontSize: 18 }}>⚠️</span>
          Please fill all fields correctly before submitting.
        </div>
      )}
    </div>
  );
}
