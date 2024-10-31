import React from 'react';

const LoginHistory = ({ history }) => {
  // Sort history by timestamp in descending order
  const sortedHistory = [...history].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  return (
    <div>
      
      <ul style={{ listStyleType: 'none', padding: '0px 5px' }}> {/* Remove default bullets */}
        {sortedHistory.map((entry, index) => (
          <li key={index}>
            <strong>Time:</strong> {new Date(entry.timestamp).toLocaleString()} <br/> <strong>Message:</strong> {entry.message}
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LoginHistory;
