import { FunctionComponent } from 'react';
import HeadRoomScreen from './HeadRoomScreen';
import FooterRoomScreen from './FooterRoomScreen';
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
        {/* <div className={styles.HeadContainer}>
          <HeadRoomScreen />
        </div>
        video
        <video src="https://giphy.com/gifs/joebiden-rznKm263CQKVRFESc6"></video>
        <div className={styles.FooterContainer}>
          <FooterRoomScreen />
        </div> */}
      </div>
    </>
  );
};

export default Room;
