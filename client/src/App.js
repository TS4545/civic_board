import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [apiMessage, setApiMessage] = useState('');

  useEffect(() => {
    // Fetch message from backend
    fetch('http://localhost:5000/api/message')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setApiMessage(data.message))
      .catch((err) => {
        console.error('Error fetching message from API:', err);
        setApiMessage('Failed to connect to backend.');
      });
  }, []);

  return (
    <div className="App">
      <h1>🗳️ Civic Board App</h1>
      <p>
        Backend says: <strong>{apiMessage || 'Loading...'}</strong>
      </p>
    </div>
  );
}

export default App;