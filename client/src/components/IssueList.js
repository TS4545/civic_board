import React from 'react';

function IssueList({ issues }) {
  return (
    <div>
      <h2>📋 Posted Issues</h2>
      <ul>
        {issues.map((issue, index) => (
          <li key={index}>
            <strong>{issue.title}</strong>
            <p>{issue.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default IssueList;