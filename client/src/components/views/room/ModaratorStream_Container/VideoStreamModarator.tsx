import React from 'react';
import styles from '../VideoSreenModarator.module.css';

import ModaratorScreen from '../ModaratorStream_Container/ModaratorScreen';
// import VideoScreenLeft from './VideoScreenLeft';
// import VideoScreenRight from './VideoScreenRight';

import RemoteStream from '../../../RemoteStream';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../state/store';

const VideoStreamModarator = () => {
  const streamLeft = useSelector((state: RootState) => state.stream.streamLeft);
  // const streamRight = useSelector(
  //   (state: RootState) => state.stream.streamRight
  // );

  return (
    <div className={styles.VideoScreenModaratorContainer}>
      {/* 🔹 Aseguramos que RemoteStream se ejecute al menos una vez */}
      {/* <RemoteStream /> */}

      <div className={styles.VideoRoomScreen}>
        <ModaratorScreen stream={streamLeft} />
        {/* <VideoScreenLeft stream={streamLeft} /> */}
        {/* <VideoScreenRight stream={streamLeft} /> */}
      </div>
    </div>
  );
};

export default VideoStreamModarator;
