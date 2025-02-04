import Room from './Room';
import Divide from '../divider/Divide';

interface ChannelInfo {
  name: string;
  avatarUrl: string | null;
  imageUrl: string | null;
}

export interface RoomData {
  id: string;
  topic: string;
  channel: ChannelInfo;
}

export interface RoomListProps {
  rooms: RoomData[];
}

export const RoomList: React.FC<RoomListProps> = ({ rooms }) => {
  console.log('Rooms:', rooms);

  return (
    <div className="flex flex-wrap justify-center gap-6 p-4">
      {rooms.map((room) => (
        <Room key={room.id} roomID={room.id} roomData={room} />
      ))}
      <Divide />
    </div>
  );
};
