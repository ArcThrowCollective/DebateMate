import React, { useState } from 'react';
import DebateModal from './DebateModal';

type Props = {};

const DebateLobby = (props: Props) => {
  const roomId = '68d05c10-af89-4fe4-9b3e-9c9ea84ae7d5';
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div>
      <button
        onClick={handleOpenModal}
        className="px-5 py-2 mt-5 rounded bg-slate-400 cursor-pointer text-white"
      >
        Join Community
      </button>
      <DebateModal
        roomId={roomId}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
};

export default DebateLobby;
