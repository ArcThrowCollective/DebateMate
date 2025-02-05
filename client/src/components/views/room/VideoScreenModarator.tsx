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

//!stream
import RemoteStream from '../../RemoteStream';
import { useSelector } from 'react-redux';
import { RootState } from '../../../state/store';

const VideoScreenModarator: FunctionComponent = () => {
  //!stream
  const streamLeft = useSelector((state: RootState) => state.stream.streamLeft);
  const streamRight = useSelector(
    (state: RootState) => state.stream.streamRight
  );

  const [muteVideos, setMuteVideos] = useState(false);

  return (
    <>
      <RemoteStream />

      <div className={styles.VideoScreenModaratorContainer}>
        <div>
          <HeadRoomScreen />
        </div>
        <div>
          <RequestContainer />
        </div>
        <div className={styles.VideoRoomScreen}>
          {/* <ModaratorScreen stream={remoteStream} muteVideos={muteVideos} /> */}
          <VideoScreenLeft muteVideos={muteVideos} streamUrl={streamLeft} />
          <VideoScreenRigth muteVideos={muteVideos} streamUrl={streamRight} />
        </div>

        <div className={styles.VideoRoomScreen}>
          <FooterScreenContainer />
        </div>
        <div className={styles.HeadRoomScreen}>{/* <HeadRoomScreen /> */}</div>
        {/* <TimerContainer setMuteVideos={setMuteVideos} /> */}
      </div>
    </>
  );
};

export default VideoScreenModarator;
