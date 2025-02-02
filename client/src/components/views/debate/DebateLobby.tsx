import React, { useState } from 'react';
import DebateModal from './DebateModal';

type Props = {};

const DebateLobby = (props: Props) => {
  const roomId = 'deb5d54b-0763-4b17-93c4-aff31a8e2902';
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
