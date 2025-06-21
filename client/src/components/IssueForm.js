import React, { useState } from 'react';

function IssueForm({ onIssuePosted }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newIssue = { title, description };

    try {
      const response = await fetch('http://localhost:5000/api/issues', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newIssue),
      });

      const data = await response.json();
      onIssuePosted(data); // send new issue to parent
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Error posting issue:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>📝 Post a New Issue</h2>
      <input
        type="text"
        placeholder="Issue title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <br />
      <textarea
        placeholder="Describe the issue"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}

export default IssueForm;