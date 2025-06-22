import React, { useState } from 'react';
import DeleteModal from './chat/ui/DeleteModal';
import './DeleteModalExample.css';

const DeleteModalExample = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletedItems, setDeletedItems] = useState([]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmDelete = () => {
    // 실제 삭제 로직을 여기에 구현
    console.log('아이템이 삭제되었습니다.');
    setDeletedItems(prev => [...prev, `아이템 ${Date.now()}`]);
    
    // 성공 메시지 표시 (실제 프로젝트에서는 토스트나 알림 사용)
    alert('삭제가 완료되었습니다.');
  };

  return (
    <div className="delete-modal-example">
      <div className="example-container">
        <h1>삭제 모달 예제</h1>
        
        <div className="example-content">
          <p>아래 버튼을 클릭하여 삭제 모달을 테스트해보세요.</p>
          
          <button 
            className="example-delete-btn"
            onClick={handleOpenModal}
          >
            삭제 모달 열기
          </button>
        </div>

        {deletedItems.length > 0 && (
          <div className="deleted-items">
            <h3>삭제된 아이템들:</h3>
            <ul>
              {deletedItems.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <DeleteModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        title="아이템 삭제"
        message="이 아이템을 정말로 삭제하시겠습니까?"
      />
    </div>
  );
};

export default DeleteModalExample; 