import Room from './Room';
import { Room as RoomType } from '../../../types/debate';

export interface RoomListProps {
  rooms: RoomType[];
}

export const RoomList: React.FC<{ rooms: RoomType[] }> = ({ rooms }) => {
  if (!rooms || rooms.length === 0) {
    return <p>No rooms available.</p>;
  }

  console.log('Rooms:', rooms);

  return (
    <div className="flex flex-wrap justify-center gap-6 p-4">
      {rooms.map((room) => (
        <Room key={room.id} roomID={room.id} roomData={room} />
      ))}
    </div>
  );
};
