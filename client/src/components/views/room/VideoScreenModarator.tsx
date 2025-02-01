import FooterRoomScreen from './FooterRoomScreen';
import styles from './VideoScreenModarator.module.css';
import HeadRoomScreen from './HeadRoomScreen';

import { FunctionComponent } from 'react';
import ReactPlayer from 'react-player';

const VideoScreenModarator: FunctionComponent = () => {
  return (
    <div>
      <div className={styles.HeadRoomScreen}>
        <HeadRoomScreen />
      </div>
      <div>
        <ReactPlayer
          className={styles.VideoScreenModarator}
          url="https://youtu.be/thxbiR-XfJo?si=zWKqEabzZO63uXKT"
          width="100%"
          height="100vh"
        ></ReactPlayer>
      </div>
      <div>
        <FooterRoomScreen />
      </div>
    </div>
  );
};

export default VideoScreenModarator;
