import React, { useEffect, useState } from 'react';
import IssueForm from './components/IssueForm';
import IssueList from './components/IssueList';

function App() {
  const [issues, setIssues] = useState([]);

  const fetchIssues = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/issues');
      const data = await res.json();
      setIssues(data);
    } catch (error) {
      console.error('Error fetching issues:', error);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  const handleNewIssue = () => {
    fetchIssues(); // re-fetch the list when a new issue is posted
  };

  return (
    <div className="App">
      <h1>🗳️ Civic Board App</h1>
      <IssueForm onIssuePosted={handleNewIssue} />
      <IssueList issues={issues} />
    </div>
  );
}

export default App;