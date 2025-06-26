import './App.css';

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AccountPage from './pages/AccountPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav>
          <h1>🗳️ Civic Board</h1>
          <div>
            <Link to="/">Home</Link>
            <Link to="/account">Account</Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/account" element={<AccountPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;