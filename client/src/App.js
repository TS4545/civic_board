import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AccountPage from './pages/AccountPage';
import InsightsPage from './pages/InsightsPage';
import AiPage from './pages/AiPage';

import './App.css';

function App() {
  return (
    <Router>
      <aside className="left-bar">
        <div className="sidebar">
          <div className="profile-box">
            <img src="public\logo512.png" alt="avatar" />
            <div>Welcome, User</div>
          </div>

          <h1 className="sidebar-title">Civly</h1>

          <nav className="sidebar-links">
            <Link to="/">Home</Link>
            <Link to="/insights">Insights</Link>
            <Link to="/account">Account</Link>
            <Link to="/ai">AI</Link>
          </nav>
        </div>
      </aside>

      <main className="main-layout">
        <div className="content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/insights" element={<InsightsPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/ai" element={<AiPage />} />
          </Routes>
        </div>
      </main>
    </Router>
  );
}

export default App;