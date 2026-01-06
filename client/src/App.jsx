
import './App.css';
import { useLocation } from 'react-router-dom';
import { Routes, Route, Navigate } from 'react-router-dom';

import Navbar      from './components/Navbar';
import ProgressBar from './components/ProgressBar';
import Step1       from './pages/Step1';
import Step2       from './pages/Step2';
import Step3       from './pages/Step3';
import Dashboard   from './pages/Dashboard';
import Sidebar     from './components/sidebar';
import './index.css';

export default function App() {
  const location = useLocation();
  const showProgressBar = ["/step1", "/step2", "/step3"].includes(location.pathname);
  const isDashboardPage = location.pathname === "/dashboard";

  return (
    <div className="flex min-h-screen bg-gray-100">
      {isDashboardPage && <Sidebar />}
      <div className={isDashboardPage ? "main-content-with-sidebar w-full" : "w-full"}>
        <Navbar />
        
        {showProgressBar && (
          <div style={{
            width: "100%",
            maxWidth: 600,
            margin: "32px auto 0 auto",
            padding: "0 16px"
          }}>
            <ProgressBar />
          </div>
        )}
        <div className="max-w-2xl mx-auto mt-8 px-4">
          <div className="mt-6">
            <Routes>
              <Route path="/" element={<Navigate to="/step1" replace />} />
              <Route path="/step1" element={<Step1 />} />
              <Route path="/step2" element={<Step2 />} />
              <Route path="/step3" element={<Step3 />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="*" element={<Navigate to="/step1" replace />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

