import { useLocation } from 'react-router-dom';
import React, { useRef, useEffect, useState } from 'react';
import "../styling/progress.css";

const steps = ["step1", "step2", "step3"];

export default function ProgressBar() {
  const { pathname } = useLocation();
  const current = steps.indexOf(pathname.replace("/", ""));
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState("forward");
  const [bounce, setBounce] = useState(false);
  const prevStep = useRef(current);

  useEffect(() => {
    if (current !== prevStep.current) {
      setDirection(current > prevStep.current ? "forward" : "backward");
      setAnimating(true);
      const timeout = setTimeout(() => setAnimating(false), 600);
      prevStep.current = current;
      return () => clearTimeout(timeout);
    }
  }, [current]);

  useEffect(() => {
    if (animating) {
      setBounce(false);
      const bounceTimeout = setTimeout(() => setBounce(true), 600); // after rocket animation
      return () => clearTimeout(bounceTimeout);
    } else {
      setBounce(false);
    }
  }, [animating]);

  return (
    <div className="steps">
      {steps.map((step, i) => (
        <React.Fragment key={i}>
          <div className="step-item">
            <div
              className={`step-circle${i <= current ? " step-circle-active" : ""}${i < current ? " step-circle-completed" : ""}`}
            >
              {i < current ? (
                
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M5 10.5L9 14.5L15 7.5" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : (
                i + 1
              )}
            </div>
            <p className="step-label">{step.replace("step", "Step ")}</p>
          </div>
          {i < steps.length - 1 && (
            <div className={`step-connector${i < current ? " step-connector-active" : ""}`}>
              <div className="step-connector-inner"></div>
              {animating && (
                ((direction === "forward" && i === current - 1) ||
                  (direction === "backward" && i === current)) && (
                  <span className={`rocket${direction === "backward" ? " rocket-reverse" : ""}${bounce ? " rocket-bounce" : ""}`}>
                    <span className="rocket-trail">
                      <span className="sparkle sparkle1"></span>
                      <span className="sparkle sparkle2"></span>
                      <span className="sparkle sparkle3"></span>
                    </span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2C13.1 2 14 2.9 14 4V7H10V4C10 2.9 10.9 2 12 2ZM18.39 8.56L20.3 10.47C20.69 10.86 20.69 11.49 20.3 11.88L18.39 13.79C18.15 14.03 17.81 14.09 17.53 13.97L15.5 13.09V17C15.5 17.55 15.05 18 14.5 18H9.5C8.95 18 8.5 17.55 8.5 17V13.09L6.47 13.97C6.19 14.09 5.85 14.03 5.61 13.79L3.7 11.88C3.31 11.49 3.31 10.86 3.7 10.47L5.61 8.56C5.85 8.32 6.19 8.26 6.47 8.38L8.5 9.26V5C8.5 4.45 8.95 4 9.5 4H14.5C15.05 4 15.5 4.45 15.5 5V9.26L17.53 8.38C17.81 8.26 18.15 8.32 18.39 8.56Z" fill="#2563eb"/>
                    </svg>
                  </span>
                )
              )}
            </div>
          )}
        </React.Fragment>
      ))}
      {current === steps.length - 1 && (
        <div className="confetti"></div>
      )}
    </div>
  );
}
