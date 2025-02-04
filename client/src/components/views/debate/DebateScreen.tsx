import useUserMedia from '../../../hooks/useUserMedia';
import VideoChat from './VideoComponent';
import { FaHandPaper, FaUser } from 'react-icons/fa';
import { BsFillCameraVideoFill } from 'react-icons/bs';
import { FaMicrophoneAlt } from 'react-icons/fa';
import { FaThumbsUp } from 'react-icons/fa';
import { RootState } from '../../../state/store';
import { useSelector } from 'react-redux';
import { useSubscription } from '@apollo/client';
import { PARTICIPANTS_UPDATED_SUBSCRIPTION } from '../../../utils/graphqlpubsubclient';
import { useEffect, useRef, useState } from 'react';
import {
  fetchParticipantsByRoomId,
  removeParticipant,
} from '../../../utils/graphqlclient';

type Props = {};

const DebateRoom = (props: Props) => {
  const { user, room } = useSelector((state: RootState) => state.navigation);
  const [participantCount, setParticipantCount] = useState(0);
  const { stream, error, videoRef } = useUserMedia({
    video: true,
    audio: false,
  });
  const hasMounted = useRef(false);

  // Listen for Participant Updates - leave or join
  const { data } = useSubscription(PARTICIPANTS_UPDATED_SUBSCRIPTION, {
    variables: { roomId: room?.id },
  });

  // Fetch initial Participants when the component mounts
  useEffect(() => {
    const fetchInitialParticipants = async () => {
      if (room?.id) {
        const participants = await fetchParticipantsByRoomId(room.id);
        setParticipantCount(participants.length);
      }
    };
    fetchInitialParticipants();
  }, [room?.id]);

  // Set Participants and Subscriptions
  useEffect(() => {
    if (data && data.participantsUpdated) {
      console.log('Participant count updated:', data.participantsUpdated);
      setParticipantCount(data.participantsUpdated.length);
    }
  }, [data]);

  // Removes Participants from DB when leaving the room
  useEffect(() => {
    const allParticipants = async () => {
      if (room?.id) {
        return await fetchParticipantsByRoomId(room.id);
      }
      return [];
    };
    if (!hasMounted.current) {
      // Only execute the clean up when unmounting not, on mounting
      hasMounted.current = true;
      return;
    }
    return () => {
      console.log('clean up');
      (async () => {
        const participants = await allParticipants();
        if (participants?.length === 1 && user?.id && room?.id) {
          console.log('Only one participant left, removing...');
          await removeParticipant(room.id, user.id);
          console.log('Participant removed successfully');
        }
      })();
    };
  }, []);

  return (
    <div className="bg-slate-400 relative min-h-screen flex flex-col justify-between">
      <VideoChat stream={stream} error={error} videoRef={videoRef} />
      <div className="bg-black inset-0 w-full h-52 absolute flex flex-col">
        <div className="justify-start p-5 text-left">
          <div className="text-3xl text-white ">Logo</div>
          <div className="flex items-center space-x-2">
            <div className="text-yellow-500 gap-x-2 border p-1">live</div>
            <FaUser className="text-white" />
            <div className="text-white">{participantCount}</div>
          </div>
          <div className="">
            <div className="text-[50px] text-white">{room?.topic}</div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 bg-black h-64 w-full p-2 flex gap-5">
        <div className="flex gap-x-6  h-14 w-1/2">
          <div className="p-5 rounded-full bg-slate-200">
            <FaMicrophoneAlt />
          </div>
          <div className="p-5 rounded-full bg-slate-200">
            <BsFillCameraVideoFill />
          </div>
        </div>
        <div className="flex gap-x-6 h-14">
          <div className="p-5 rounded-full bg-slate-200">
            <FaThumbsUp />
          </div>
          <div className="p-5 rounded-full bg-slate-200">
            <FaHandPaper />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DebateRoom;
