// import FooterRoomScreen from './FooterRoomScreen';
import styles from './VideoSreenModarator.module.css';
import HeadRoomScreen from './HeadRoomScreen';
// import FooterModaratorRoomScreen from './FooterModaratorRoomScreen';
import FooterModaratorControlContain from './ModeratorView_Container/FooterControl/FooterModaratorControl_Container';

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
        <FooterModaratorControlContain />
      </div>
    </div>
  );
};

export default VideoScreenModarator;
