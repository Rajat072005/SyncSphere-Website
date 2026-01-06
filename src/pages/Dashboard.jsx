import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

import "react-loading-skeleton/dist/skeleton.css";
import "../styling/dashboard.css";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from "framer-motion";
import { FiUsers, FiFolder, FiBell, FiLinkedin, FiGithub, FiMail, FiGlobe } from "react-icons/fi";

export default function Dashboard() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => { 
      const data = JSON.parse(localStorage.getItem("userData") || "{}");
      setUser(data);
      setLoading(false);
    }, 900); 
  }, []);

  
  const teamCount = user.team || 5;
  const activeProjects = 3;
  const notifications = 7;
   const weeklyData = [
    { name: 'Mon', progress: 20 },
    { name: 'Tue', progress: 40 },
    { name: 'Wed', progress: 60 },
    { name: 'Thu', progress: 80 },
    { name: 'Fri', progress: 100 },
    { name: 'Sat', progress: 70 },
    { name: 'Sun', progress: 90 },
   ];

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ flex: 1 }}>
        <div className="dashboard-container">
          <div className="dashboard-hero-bg"></div>
          <div className="dashboard-profile">
            {loading ? (
              <Skeleton circle width={56} height={56} />
            ) : (
              <img
                src={
                  user.avatar ||
                  `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(user.name || "User")}`
                }
                alt="User Avatar"
                className="dashboard-avatar"
              />
            )}
            <div>
              {loading ? (
                <Skeleton width={180} height={32} />
              ) : (
                <motion.h2
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                >
                  Welcome, {user.name || "User"}!
                </motion.h2>
              )}
              <span className="dashboard-greeting">
                {loading ? <Skeleton width={120} /> : "Glad to see you back 👋"}
              </span>
            </div>
          </div>
          <div className="user-info">
            {loading ? (
              <>
                <Skeleton width={220} height={18} count={6} style={{ marginBottom: 8 }} />
              </>
            ) : (
              <>
                <p><b>Email:</b> {user.email}</p>
                <p><b>Company:</b> {user.company}</p>
                <p><b>Industry:</b> {user.industry}</p>
                <p><b>Team Size:</b> {user.team}</p>
                <p><b>Notification Pref:</b> {user.notification}</p>
                <p><b>Theme:</b> {user.theme}</p>
              </>
            )}
          </div>
          <div className="dashboard-cards">
            {[1, 2, 3].map((_, i) =>
              loading ? (
                <div className="dashboard-card" key={i}>
                  <Skeleton width={120} height={22} style={{ marginBottom: 12 }} />
                  <Skeleton width={40} height={32} />
                </div>
              ) : null
            )}
            {!loading && (
              <>
                <div className="dashboard-card">
                  <h3><FiUsers style={{ marginRight: 8 }} /> Team Members</h3>
                  <p className="card-value">{user.team || 5}</p>
                </div>
                <div className="dashboard-card">
                  <h3><FiFolder style={{ marginRight: 8 }} /> Active Projects</h3>
                  <p className="card-value">3</p>
                </div>
                <div className="dashboard-card">
                  <h3><FiBell style={{ marginRight: 8 }} /> Notifications</h3>
                  <p className="card-value">7</p>
                </div>
              </>
            )}
          </div>
          <div className="dashboard-progress">
            <span>Weekly Goal</span>
            <div className="progress-bar-bg">
              {loading ? (
                <Skeleton width="100%" height={14} />
              ) : (
                <div className="progress-bar-fill" style={{ width: "80%" }}></div>
              )}
            </div>
            <span className="progress-label">
              {loading ? <Skeleton width={80} /> : "80% Complete"}
            </span>
          </div>
          {/* Chart */}
          <div className="dashboard-chart">
            <h3>Weekly Progress</h3>
            {loading ? (
              <Skeleton width="100%" height={200} />
            ) : (
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={[
                  { name: 'Mon', progress: 20 },
                  { name: 'Tue', progress: 40 },
                  { name: 'Wed', progress: 60 },
                  { name: 'Thu', progress: 80 },
                  { name: 'Fri', progress: 100 },
                  { name: 'Sat', progress: 70 },
                  { name: 'Sun', progress: 90 },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="progress" stroke="#2563eb" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
          <div className="dashboard-bell">
            {loading ? (
              <Skeleton circle width={32} height={32} />
            ) : (
              <>
                <span className="bell-icon">🔔</span>
                <span className="bell-badge">{7}</span>
              </>
            )}
          </div>
          <div className="dashboard-actions">
            {loading ? (
              <>
                <Skeleton width={120} height={36} style={{ marginRight: 12 }} />
                <Skeleton width={120} height={36} />
              </>
            ) : (
              <>
                <button className="action-btn">+ Add Project</button>
                <button className="action-btn">Invite Member</button>
              </>
            )}
          </div>
        </div>
      </div>
      
      <footer className="big-footer">
        <div className="footer-content">
          {/* Logo & About */}
          <div className="footer-section">
            <div className="footer-logo">
              
              <svg
                width="38"
                height="38"
                viewBox="0 0 38 38"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ marginRight: 10 }}
              >
                <rect x="2" y="17" width="20" height="6" fill="#2563eb" />
                <rect x="17" y="2" width="6" height="21" fill="#38bdf8" />
                <polyline points="2,36 36,2" stroke="#2563eb" strokeWidth="6" />
              </svg>
              <span className="footer-logo-text">SyncSphere</span>
            </div>
            <p className="footer-about">
              SyncSphere is a modern dashboard for managing your team, projects, and progress.
            </p>
          </div>
          {/* Quick Links */}
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#">Dashboard</a></li>
              <li><a href="#">Projects</a></li>
              <li><a href="#">Team</a></li>
              <li><a href="#">Settings</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Contact</h4>
            <p><FiMail /> intern@project.com</p>
            <p><FiGlobe /> www.internproject.com</p>
            <div className="footer-social">
              <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FiLinkedin /></a>
              <a href="https://github.com/" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FiGithub /></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          © {new Date().getFullYear()} SyncSphere. All rights reserved.
        </div>
      </footer>
    </div>
  );
}