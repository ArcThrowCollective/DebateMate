import styles from './VideoSreenModarator.module.css';
import { FunctionComponent, useState } from 'react';
import VideoScreenRigth from './SpecialGuestView_Container/VideoSreenRigth';
import VideoScreenLeft from './SpecialGuestView_Container/VideoScreenLeft';
import HeadRoomScreen from './HeadRoomScreen';

const VideoScreenModarator: FunctionComponent = () => {
  const [muteVideos, setMuteVideos] = useState(false);

  return (
    <>
      <div className={styles.VideoScreenModaratorContainer}>
        <div>
          <HeadRoomScreen />
        </div>
        <div className={styles.VideoRoomScreen}>
          <VideoScreenLeft muteVideos={muteVideos} />
          <VideoScreenRigth muteVideos={muteVideos} />
        </div>
      </div>
    </>
  );
};

export default VideoScreenModarator;
