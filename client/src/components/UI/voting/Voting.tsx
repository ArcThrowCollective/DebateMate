import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import { io } from 'socket.io-client';
import { RootState } from '../../../state/store';
import { updateVotes } from '../../../state/vote/voteSlice';
import { Modal } from '../modal/ShowModal';
import Avatar from '../avatar/Avatar';
import { Button } from '../buttons/Button';

const socket = io(import.meta.env.VITE_SOCKET_URL);

interface VotesState {
  [key: string]: { up: number; down: number };
}

export const TrackSpeakerVotes = ({ speakerId }: { speakerId: string }) => {
  const dispatch = useDispatch();
  const votes = useSelector(
    (state: RootState) =>
      (state.votes as VotesState)[speakerId] ?? { up: 0, down: 0 }
  );

  const [timeLeft, setTimeLeft] = useState(55);
  const [showModal, setShowModal] = useState(false);
  const [overlayType, setOverlayType] = useState<
    'signup' | 'login' | 'channel' | 'topic' | 'vote' | null
  >(null);

  // Closing modal
  const closeOverlay = () => {
    setOverlayType(null);
    setShowModal(false);
  };

  useEffect(() => {
    socket.on('voteUpdated', ({ speakerId, votes }) => {
      dispatch(updateVotes({ speakerId, votes }));
    });

    return () => {
      socket.off('voteUpdated');
    };
  }, [dispatch]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setOverlayType('vote');
      setShowModal(true);
    }
  }, [timeLeft]);

  const handleVote = (
    type: 'up' | 'down',
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.currentTarget.classList.add('clicked');

    const updatedVotes = {
      up: type === 'up' ? votes.up + 1 : votes.up,
      down: type === 'down' ? votes.down + 1 : votes.down,
    };

    socket.emit('castVote', { speakerId, votes: updatedVotes });
    dispatch(updateVotes({ speakerId, votes: updatedVotes }));

    // Remove animation after it plays
    setTimeout(() => e.currentTarget.classList.remove('clicked'), 500);
  };

  return (
    <>
      <div className="flex gap-8">
        <button
          data-testid="btn__thumbs-up"
          className="text-3xl thumbs up"
          onClick={(e) => handleVote('up', e)}
        >
          <FaThumbsUp className="thumb-icon" />
        </button>

        <button
          data-testid="btn__thumbs-down"
          className="text-3xl thumbs down"
          onClick={(e) => handleVote('down', e)}
        >
          <FaThumbsDown className="thumb-icon" />
        </button>
      </div>

      {showModal && (
        <Modal type={overlayType} onClose={closeOverlay}>
          <div className="flex flex-col gap-4 items-center p-10">
            <Avatar userName="username" />
            <h2 className="text-xl">Final Score</h2>
            <div className="flex gap-4">
              <div className="vote__up">
                <FaThumbsUp /> {votes.up}
              </div>
              <div className="vote__down">
                <FaThumbsDown /> {votes.down}
              </div>
            </div>
            <div className="flex gap-4">
              <h3 className="">Experience gained:</h3>
              <p>+130</p>
            </div>
          </div>

          <div className="flex flex-col gap-4 items-center mb-10">
            <p>Join the Debate</p>

            <Button onClick={() => setShowModal(false)}>Connect</Button>
          </div>
        </Modal>
      )}
    </>
  );
};
