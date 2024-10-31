import React from 'react';

const Profilebio = ({ currentprofile }) => {
  return (
    <div>
      <div>
        {currentprofile?.tags.length !== 0 ? (
          <>
            <h4>Tags watched</h4>
            {currentprofile?.tags.map((tag, index) => (
              <p
                key={`${tag}-${index}`}  // Using tag and index to ensure unique keys
                style={{
                  display: 'inline-block',
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  padding: '5px 10px',
                  margin: '5px',
                  backgroundColor: '#f3f3f3'
                }}
              >
                {tag}
              </p>
            ))}
          </>
        ) : (
          <p>0 Tags watched</p>
        )}
      </div>
      <div>
        {currentprofile?.about ? (
          <>
            <h4>About</h4>
            <p style={{
                  display: 'inline-block',
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  padding: '5px 10px',
                  margin: '5px',
                }}
            >
              {currentprofile?.about}
            </p>
          </>
        ) : (
          <p>No bio found</p>
        )}
      </div>
    </div>
  );
};

export default Profilebio;
