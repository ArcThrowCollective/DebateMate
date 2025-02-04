import ViewerCount from '../badges/ViewerCount';
import './Room.css';

import { RoomData } from './RoomList';
import Avatar from '../avatar/Avatar';
import { navigateToRoom } from '../../../state/navigation/navigationSlice';

export interface RoomProps {
  roomID: string;
  roomData: RoomData;
}

export default function Room({ roomID, roomData }: RoomProps): JSX.Element {
  return (
    <div className="room__container" key={roomID}>
      <div
        className="room__image"
        style={{
          backgroundImage: `url(${roomData.channel.imageUrl || 'https://github.com/dripstaltd.png'})`,
        }}
      >
        <div id="liveLabel">LIVE</div>
        <ViewerCount viewers={0} />
      </div>

      <div className="room__textArea">
        <Avatar userName={roomData.channel.name} />
        <h2 id="topic__title">{roomData.topic}</h2>
      </div>

      <button className="btn__join" onClick={() => navigateToRoom(roomID)}>
        Join
      </button>
    </div>
  );
}
