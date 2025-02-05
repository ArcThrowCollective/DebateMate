import styles from './VideoSreenModarator.module.css';

// import FooterModaratorControlContain from './ModeratorView_Container/FooterControl/FooterModaratorControl_Container';
// import ModaratorScreen from './ModaratorScreen';
import { FunctionComponent, useState } from 'react';
import VideoScreenRigth from './SpecialGuestView_Container/VideoSreenRigth';
import VideoScreenLeft from './SpecialGuestView_Container/VideoScreenLeft';
import FooterScreenContainer from './ModeratorView_Container/FooterControl/FooterScreen_Container';
import RequestContainer from './ModeratorView_Container/FooterControl/RequestContainer';
import HeadRoomScreen from './HeadRoomScreen';

// import TimerContainer from './SpecialGuestView_Container/HeadScreen/TimerContainer';

const VideoScreenModarator: FunctionComponent = () => {
  const [muteVideos, setMuteVideos] = useState(false);

  return (
    <>
      {/* <RemoteStream /> */}

      <div className={styles.VideoScreenModaratorContainer}>
        <div>
          <HeadRoomScreen />
        </div>
        {/* <div>
          <RequestContainer />
        </div> */}
        <div className={styles.VideoRoomScreen}>
          {/* <ModaratorScreen stream={remoteStream} muteVideos={muteVideos} /> */}
          <VideoScreenLeft muteVideos={muteVideos} />
          <VideoScreenRigth muteVideos={muteVideos} />
        </div>

        <div className={styles.HeadRoomScreen}>{/* <HeadRoomScreen /> */}</div>
        {/* <TimerContainer setMuteVideos={setMuteVideos} /> */}
      </div>
    </>
  );
};

export default VideoScreenModarator;
