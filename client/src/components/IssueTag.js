import React, { useState } from 'react';

function IssueTag({ tag }) {
  const [info, setInfo] = useState({ title: '', summary: '' });
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const handleClick = async () => {
    if (loading) return;
    if (show) return setShow(false);

    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/legislation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tag }),
      });
      const data = await res.json();
      setInfo({ title: data.title, summary: data.summary });
      setShow(true);
    } catch {
      setInfo({ title: '', summary: 'Failed to load summary.' });
      setShow(true);
    }
    setLoading(false);
  };

  return (
    <div style={{ display: 'inline-block', position: 'relative', marginLeft: '0.5rem' }}>
      <button
        onClick={handleClick}
        disabled={loading}
        style={{
          background: loading ? '#cfd6df' : '#e1e8f0',
          border: 'none',
          padding: '4px 8px',
          borderRadius: '12px',
          cursor: loading ? 'not-allowed' : 'pointer',
          fontSize: '0.85rem',
          color: '#0366d6'
        }}
      >
        {loading ? 'Loading...' : `${tag}`}
      </button>

      {show && !loading && (
        <div style={{
          marginTop: '0.5rem',
          padding: '10px',
          background: '#f6f8fa',
          borderRadius: '6px',
          fontSize: '0.9rem',
          color: '#24292e',
          width: 'min(90vw, 500px)',
          whiteSpace: 'normal',
          position: 'absolute',
          left: '0',
          zIndex: 5,
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
        }}>
          {info.title && (
            <a
              href={`https://www.google.com/search?q=${encodeURIComponent(info.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ 
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '600',
                color: '#0366d6',
                textDecoration: 'none'
              }}
            >
              {info.title}
            </a>
          )}
          <div>{info.summary}</div>
        </div>
      )}
    </div>
  );
}

export default IssueTag;