import styles from './VideoSreenModarator.module.css';
import HeadRoomScreen from './HeadRoomScreen';
// import FooterModaratorControlContain from './ModeratorView_Container/FooterControl/FooterModaratorControl_Container';
import { FunctionComponent, useState } from 'react';
import VideoScreenRigth from './SpecialGuestView_Container/VideoSreenRigth';
import VideoScreenLeft from './SpecialGuestView_Container/VideoScreenLeft';
import ModaratorScreen from './ModaratorScreen';
import TimerContainer from './SpecialGuestView_Container/HeadScreen/TimerContainer';

const VideoScreenModarator: FunctionComponent = () => {
  const [muteVideos, setMuteVideos] = useState(false);

  return (
    <div className={styles.VideoScreenModaratorContainer}>
      <div className={styles.VideoRoomScreen}>
        <ModaratorScreen />
        <VideoScreenLeft muteVideos={muteVideos} />
        <VideoScreenRigth muteVideos={muteVideos} />
      </div>

      <div className={styles.HeadRoomScreen}>
        <HeadRoomScreen />
      </div>
      <TimerContainer setMuteVideos={setMuteVideos} />
    </div>
  );
};

export default VideoScreenModarator;
