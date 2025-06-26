import React, { useEffect, useState } from 'react';
import IssueForm from '../components/IssueForm';
import IssueList from '../components/IssueList';

function HomePage() {
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
    fetchIssues();
  };

  return (
    <div className="space-y-6">
      <IssueForm onIssuePosted={handleNewIssue} />
      <hr />
      <IssueList issues={issues} />
    </div>
  );
}

export default HomePage;