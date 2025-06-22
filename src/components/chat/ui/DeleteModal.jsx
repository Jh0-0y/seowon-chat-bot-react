import React from 'react';
import './DeleteModal.css';

const DeleteModal = ({ isOpen, onClose, onConfirm, title = "삭제 확인", message = "정말로 삭제하시겠습니까?" }) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div className="delete-modal-overlay" onClick={handleBackdropClick}>
      <div className="delete-modal">
        <div className="delete-modal-header">
          <div className="delete-modal-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="#EF4444"/>
            </svg>
          </div>
          <h2 className="delete-modal-title">{title}</h2>
        </div>
        
        <div className="delete-modal-content">
          <p className="delete-modal-message">{message}</p>
          <div className="delete-modal-warning">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 19H22L12 2Z" fill="#F59E0B"/>
            </svg>
            <span>삭제하면 되돌릴 수 없습니다.</span>
          </div>
        </div>

        <div className="delete-modal-actions">
          <button 
            className="delete-modal-btn delete-modal-btn-cancel" 
            onClick={onClose}
          >
            취소
          </button>
          <button 
            className="delete-modal-btn delete-modal-btn-confirm" 
            onClick={handleConfirm}
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal; 