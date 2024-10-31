import React from 'react';
import { Link } from 'react-router-dom';

const User = ({ user }) => {
  const displayedTags = user.tags?.slice(0, 4); // Display up to 4 tags
  const hasMoreTags = user.tags?.length > 4;    // Check if there are more than 4 tags

  return (
    <Link to={`/Users/${user._id}`} className='user-profile-link'>
      <h3>{user.name.charAt(0).toUpperCase()}</h3>
      <h5>{user.name}<div className='user-tags'>
        {displayedTags?.map((tag, index) => (
          <span key={index} className='tag-items' style={{border:'1px solid grey',padding:'1px 4px',borderRadius:'5px',marginRight:'2px',fontSize:'10px',fontWeight:'400'}}>
            {tag}
          </span>
        ))}
        {hasMoreTags && <span>...</span>} {/* Display '...' if there are more tags */}
      </div></h5>
      
    </Link>
  );
};

export default User;
