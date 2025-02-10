import ViewerCount from '../badges/ViewerCount';
import './Room.css';

import Avatar from '../avatar/Avatar';
import { navigateToRoom } from '../../../state/navigation/navigationSlice';
import { Room as RoomType } from '../../../types/debate';
import { useDispatch } from 'react-redux';

export interface RoomProps {
  roomID: string;
  roomData: RoomType;
}

export default function Room({ roomID, roomData }: RoomProps): JSX.Element {
  const dispatch = useDispatch();
  return (
    <div className="room__container" key={roomID}>
      <div
        className="room__image"
        style={{
          backgroundImage: `url(${roomData.imageUrl || roomData.channel.avatarUrl || 'https://github.com/dripstaltd.png'})`,
        }}
      >
        <div id="liveLabel">LIVE</div>
        <ViewerCount viewers={100} />
      </div>

      <div className="room__textArea">
        <Avatar userName={roomData.channel.name} />
        <h2 id="topic__title">{roomData.topic}</h2>
        <span></span>
      </div>

      <button
        className="btn__join"
        onClick={() => dispatch(navigateToRoom(roomID))}
      >
        Join
      </button>
    </div>
  );
}
