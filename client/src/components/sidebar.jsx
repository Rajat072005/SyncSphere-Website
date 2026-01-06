
import { useState } from 'react';
import { LayoutDashboard, Users, Settings, Home, Moon } from 'lucide-react';
import Lottie from "lottie-react";
import robotAnimation from "../assets/robot.json"; 
import '../styling/Sidebar.css'; 

export default function Sidebar() {
  
  const [activeLabel, setActiveLabel] = useState('Dashboard');

  // 2. Define your nav items here
  const navItems = [
    { label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { label: 'Users',     icon: <Users size={20} /> },
    { label: 'Projects',  icon: <Home size={20} /> },
    { label: 'Settings',  icon: <Settings size={20} /> },
  ];

  return (
    <aside className="sidebar">
      
      <div className="sidebar-logo">
        <div className="sidebar-robot-glow">
          <Lottie animationData={robotAnimation} loop={true} style={{ width: 90, height: 90 }} />
        </div>
        <span className="sidebar-logo-text">
          Welcome, Human!
        </span>
      </div>

      
      <nav className="sidebar-nav">
        {navItems.map((item) => {
          
          const isActive = item.label === activeLabel;

          return (
            <div
              key={item.label}
              onClick={() => setActiveLabel(item.label)}
              className={
                isActive 
                  ? 'sidebar-nav-item active' 
                  : 'sidebar-nav-item'
              }
            >
              {item.icon}
              <span className="sidebar-nav-text">{item.label}</span>
            </div>
          );
        })}
      </nav>

      
      <div className="sidebar-footer">
        <Moon size={18} />
        <span>Dark Mode</span>
      </div>
    </aside>
  );
}
