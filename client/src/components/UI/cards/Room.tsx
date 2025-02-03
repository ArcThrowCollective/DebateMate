import { FaUserCircle } from 'react-icons/fa';
import ViewerCount from '../badges/ViewerCount';
import './Room.css';

import { RoomData } from './RoomList';

interface RoomProps {
  roomID: number;
  roomData: RoomData;
}

export default function Room({ roomID, roomData }: RoomProps): JSX.Element {
  return (
    <div className="room__container" key={roomID}>
      <div
        className="room__image"
        style={{ backgroundImage: `url(${roomData.imageUrl})` }}
      >
        <div id="liveLabel">LIVE</div>

        <ViewerCount viewers={100} />
      </div>

      <div className="room__textArea">
        <FaUserCircle id="Avatar" />
        <h2 id="topic__title">{roomData.topic}</h2>
      </div>

      <button className="btn__join">Join</button>
    </div>
  );
}
