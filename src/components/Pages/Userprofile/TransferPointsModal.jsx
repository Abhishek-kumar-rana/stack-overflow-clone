import React from 'react';
import { FaCoins, FaUser, FaHandHoldingUsd } from 'react-icons/fa';
import './TransferPointsModal.css';

const TransferPointsModal = ({ isOpen, toggleModal, onConfirm, availablePoints, username }) => {
  const [transferAmount, setTransferAmount] = React.useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setTransferAmount(value);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={toggleModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Transfer Points</h2>
        
        <div className="icons-container">
          <span style={{ fontWeight: '600' }}>To</span>
          <FaUser size={15} className="icon" />
          <span> {username}</span>
        </div>
        
        <p>Available Points: {availablePoints}</p>
        <p>Select the amount to transfer points:</p>
        
        <input
          type="number"
          pattern="[0-9]*"
          onKeyPress={(event) => {
            if (!/[0-9]/.test(event.key)) {
              event.preventDefault();
            }
          }}
          placeholder="Enter points"
          className="input-field"
          value={transferAmount}
          onChange={handleChange}
          min="1" // Prevents negative numbers
          step="1" // Allows only whole numbers, no decimals
        />
        
        <button onClick={() => onConfirm(transferAmount)} className="confirm-btn">Confirm Transfer</button>
        <button onClick={toggleModal} className="close-btn">Cancel</button>
      </div>
    </div>
  );
};

export default TransferPointsModal;
