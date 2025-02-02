// import FooterRoomScreen from './FooterRoomScreen';
import styles from './VideoSreenModarator.module.css';
import HeadRoomScreen from './HeadRoomScreen';
// import FooterModaratorRoomScreen from './FooterModaratorRoomScreen';
import FooterModaratorControlContain from './ModeratorView_Container/FooterControl/FooterModaratorControl_Container';
import { FunctionComponent } from 'react';
import VideoScreen from './SpecialGuestView_Container/VideoSreen';

const VideoScreenModarator: FunctionComponent = () => {
  return (
    <div className={styles.VideoScreenModaratorContainer}>
      <div className={styles.VideoRoomScreen}>
        <VideoScreen />
      </div>

      <div className={styles.HeadRoomScreen}>
        <HeadRoomScreen />
      </div>
      <div className={styles.FooterRoomScreen}>
        <FooterModaratorControlContain />
      </div>
    </div>
  );
};

export default VideoScreenModarator;
