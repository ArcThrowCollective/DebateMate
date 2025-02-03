import Room from './Room';
import Divide from '../divider/Divide';

interface ChannelInfo {
  name: string;
  avatarUrl: string;
}

export interface RoomData {
  topic: string;
  imageUrl: string;
  channelInfo: ChannelInfo;
}

interface RoomListProps {
  rooms: RoomData[];
}

export const RoomList: React.FC<RoomListProps> = ({ rooms }) => {
  return (
    <div className="flex flex-wrap justify-center gap-6 p-4">
      {rooms.map((roomData, index) => (
        <Room key={index} roomID={index} roomData={roomData} />
      ))}
      <Divide />
    </div>
  );
};
