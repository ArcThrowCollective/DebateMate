import { FunctionComponent } from 'react';
// import HeadRoomScreen from './HeadRoomScreen';
// import FooterRoomScreen from './FooterRoomScreen';
import styles from './Room.module.css';
import RoomModarator from './VideoScreenModarator';

interface RoomProps {
  roomId: string;
}

const Room: FunctionComponent<RoomProps> = () => {
  return (
    <>
      <div className={styles.RoomContainer}>
        <RoomModarator />
      </div>
    </>
  );
};

export default Room;
