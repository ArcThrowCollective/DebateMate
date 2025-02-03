import { useDispatch } from 'react-redux';
import { navigateToDebateScreen } from '../../../state/navigation/navigationSlice';

import { createParticipant } from '../../../utils/graphqlclient';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { AuthUser, Participant } from '../../../types/debate';
import { fetchRoomById } from '../../../utils/graphqlclient';
import { Room } from '../../../types/debate';

type Props = {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  roomId: string;
};

const DebateModal = ({ isModalOpen, setIsModalOpen, roomId }: Props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [room, setRoom] = useState<Room | null>(null);
  const [participant, setParticipant] = useState<Participant | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    // check if a user is logged in (per sending auth cookie)
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:3000/auth/status', {
          withCredentials: true,
        });
        console.log(response.data);
        if (response.data.isAuthenticated) {
          // User exists becomes Participant and has MEMBER rights
          setIsLoggedIn(true);
          setUser(response.data.user);
          setParticipant(response.data.user);
          if (user && room) {
            createParticipant(roomId, user?.id, 'GUEST');
          } else {
            throw new Error('userId or room id is null');
          }
        } else {
          // User becomes Participant and has GUEST rights
          setIsLoggedIn(false);

          // Our Guest User in the Database is '7573787b-4a33-4667-bbad-64d2189a76d1'

          const STATIC_GUESTID = '7573787b-4a33-4667-bbad-64d2189a76d1';
          createParticipant(roomId, STATIC_GUESTID, 'GUEST');
        }
      } catch (error) {
        console.error('Error auth status: ', error);
        setIsLoggedIn(false);
      }
    };

    const getRoom = async () => {
      try {
        const roomData = await fetchRoomById(roomId as string);
        setRoom(roomData);
      } catch (error) {
        console.error('Error fetching room:', error);
      }
    };

    checkAuthStatus();
    if (roomId) getRoom();
  }, []);

  const handleConfirm = async () => {
    //TODO Pass the correct room id
    if (isLoggedIn && user) {
      //TODO Additional call to graphql for more information
      dispatch(navigateToDebateScreen({ user, room }));
    } else {
      // User who tries to view without authentication is a GUEST
      dispatch(navigateToDebateScreen({ user, room }));
    }
  };
  return (
    <div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Join Debate</h2>
            <p className="mb-4">Are you sure you want to join the Debate</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 rounded bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 rounded bg-blue-500 text-white"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DebateModal;
