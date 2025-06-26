import React from 'react';

function IssueList({ issues }) {
  if (!issues.length) {
    return <p className="no-issues">No issues posted yet.</p>;
  }

  return (
    <div className="issue-list">
      <h2 style={{ marginBottom: '1rem' }}>📋 Posted Issues</h2>
      {issues.map((issue, index) => (
        <div key={index} className="issue-card">
          <div className="issue-header">
            <span className="issue-icon">📣</span>
            <h3>{issue.title}</h3>
          </div>
          <p>{issue.description}</p>
          <div className="issue-meta">
            👤 <strong>{issue.username || "Anonymous"}</strong> &middot;{" "}
            <time>{issue.created_at ? new Date(issue.created_at).toLocaleString() : "Unknown time"}</time>
          </div>
        </div>
      ))}
    </div>
  );
}

export default IssueList;