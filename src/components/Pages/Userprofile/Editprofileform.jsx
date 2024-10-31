import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateprofile } from '../../../action/users';
import './Userprofile.css';

const Editprofileform = ({ currentuser, setswitch }) => {
  const dispatch = useDispatch();

  // Initialize state with values from currentuser
  const [name, setname] = useState(currentuser?.result?.name);
  const [about, setabout] = useState(currentuser?.result?.about);
  const [tags, settags] = useState(currentuser?.result?.tags || []);
  const [tagInput, setTagInput] = useState(''); // Store current input

  const updatedUser = useSelector((state) => state.currentuserreducer);

  // Synchronize the state with the currentuser when the form initially loads
  useEffect(() => {
    settags(currentuser?.result?.tags || []);
  }, [currentuser]);

  // Synchronize state after updates (if the user gets updated in the store)
  useEffect(() => {
    if (updatedUser?.result?._id === currentuser?.result?._id) {
      setname(updatedUser?.result?.name);
      setabout(updatedUser?.result?.about);
      settags(updatedUser?.result?.tags || []);
      console.log(updatedUser?.result?.tags)
    }
  }, [updatedUser, currentuser]);

  const handlesubmit = (e) => {
    e.preventDefault();
    if (tags.length === 0) {
      alert('Please update the tags field');
    } else {
      // Dispatch the update action and close the form
      dispatch(updateprofile(currentuser?.result?._id, { name, about, tags }));
      setswitch(false);
    }
  };

  const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
  };

  const handleTagKeyPress = (e) => {
    if (['Enter', ','].includes(e.key) && tagInput.trim()) {
      e.preventDefault();
      settags([...tags, tagInput.trim()]); // Add the current input as a new tag
      setTagInput(''); // Clear the input field
    }
  };

  const handleTagDelete = (index) => {
    settags(tags.filter((_, i) => i !== index)); // Remove tag by index
  };

  return (
    <div>
      <h1 className="edit-profile-title">Edit Your Profile</h1>
      <h2 className="edit-profile-title-2">Public Information</h2>
      <form className="edit-profile-form" onSubmit={handlesubmit}>
        <label htmlFor="name">
          <h3>Display name</h3>
          <input
            type="text"
            value={name}
            onChange={(e) => setname(e.target.value)}
          />
        </label>
        <label htmlFor="about">
          <h3>About me</h3>
          <textarea
            id="about"
            cols="30"
            rows="10"
            value={about}
            onChange={(e) => setabout(e.target.value)}
          ></textarea>
        </label>
        <label htmlFor="tags">
          <h3>Watched tags</h3>
          <p>Add tags separated by comma (`,`), or press Enter</p>
          <input
            type="text"
            id="tags"
            value={tagInput}
            onChange={handleTagInputChange}
            onKeyDown={handleTagKeyPress}
            placeholder="e.g. javascript, react, css"
          />
          <div className="tag-list">
            {tags.map((tag, index) => (
              <span key={index} className="tag-item">
                {tag} <button type="button" onClick={() => handleTagDelete(index)}>x</button>
              </span>
            ))}
          </div>
        </label>
        <br />
        <input
          type="submit"
          value="Save Profile"
          className="user-submit-btn"
        />
        <button
          type="button"
          className="user-cancel-btn"
          onClick={() => setswitch(false)}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default Editprofileform;
