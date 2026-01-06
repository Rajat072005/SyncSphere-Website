import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from "react-router-dom";
import ThemeSwitcher from "./ThemeSwitcher";
import "../styling/navbar.css";
import Logo from "../assets/synclogo.png"; 

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState({});
  const avatarRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    
    const data = JSON.parse(localStorage.getItem("userData") || "{}");
    setUser(data);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  
  useEffect(() => {
    function handleClickOutside(event) {
      if (avatarRef.current && !avatarRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  
  const isDashboard = location.pathname === "/dashboard";

  return (
    <nav className={`navbar${scrolled ? " navbar-scrolled" : ""}`}>
      <div className="navbar-left">
        <div className="navbar-logo">
          
          { <img id='synclogo' src={Logo} alt="SyncSphere Logo" /> }
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "1.2rem" }}>
        <div className="navbar-theme-switcher">
          <ThemeSwitcher />
        </div>
        {isDashboard && (
          <div ref={avatarRef} style={{ position: "relative" }}>
            <img
              src={
                user.avatar ||
                `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(user.name || "User")}`
              }
              alt="User Avatar"
              style={{
                width: 38,
                height: 38,
                borderRadius: "50%",
                border: "2px solid #38bdf8",
                cursor: "pointer",
                objectFit: "cover",
                boxShadow: "0 2px 8px #2563eb22"
              }}
              onClick={() => setDropdownOpen((open) => !open)}
            />
            {dropdownOpen && (
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  top: 48,
                  background: "#fff",
                  color: "#23293a",
                  borderRadius: "0.7rem",
                  boxShadow: "0 4px 24px 0 rgba(56,189,248,0.18)",
                  minWidth: 140,
                  zIndex: 1001,
                  padding: "0.5rem 0"
                }}
              >
                <div style={{ padding: "0.7rem 1.2rem", cursor: "pointer" }}>Profile</div>
                <div style={{ padding: "0.7rem 1.2rem", cursor: "pointer" }}>Settings</div>
                <div style={{ padding: "0.7rem 1.2rem", cursor: "pointer", color: "#f87171" }}>Log out</div>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
