import styles from './VideoSreenModarator.module.css';
import HeadRoomScreen from './HeadRoomScreen';
// import FooterModaratorControlContain from './ModeratorView_Container/FooterControl/FooterModaratorControl_Container';
import { FunctionComponent } from 'react';
import VideoScreenRigth from './SpecialGuestView_Container/VideoSreenRigth';
import VideoScreenLeft from './SpecialGuestView_Container/VideoScreenLeft';
import ModaratorScreen from './ModaratorScreen';

const VideoScreenModarator: FunctionComponent = () => {
  return (
    <div className={styles.VideoScreenModaratorContainer}>
      <div className={styles.VideoRoomScreen}>
        <ModaratorScreen />
        <VideoScreenLeft />
        <VideoScreenRigth />
      </div>

      <div className={styles.HeadRoomScreen}>
        <HeadRoomScreen />
      </div>
      <div></div>
      {/* <div className={styles.FooterRoomScreen}>
        <FooterModaratorControlContain />
      </div> */}
    </div>
  );
};

export default VideoScreenModarator;
