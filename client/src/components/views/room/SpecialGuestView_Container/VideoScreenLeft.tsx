import ReactPlayer from 'react-player/lazy';
import styles from './VideoScreenRigth.module.css';
import { useEffect, useState } from 'react';
import { BsMicMute } from 'react-icons/bs';
import Stream from '../../../Stream';

function VideoScreenLeft({ muteVideos }) {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [offVideo, setOffVideo] = useState(false);

  useEffect(() => {
    setMuted(muteVideos);
  }, [muteVideos]);

  return (
    <div className={styles.VideoScreenContainer}>
      {!offVideo ? (
        <>
          <Stream></Stream>
          {/* <ReactPlayer
            className={styles.VideoScreenPlayer}
            url="https://youtube.com/shorts/XU0kJIi-JN8?si=Vz-XniEVLaRFleP8"
            width="100%"
            height="100%"
            loop={true}
            playing={playing}
            muted={muted}
          /> */}

          <div className={styles.VideoControls}>
            <button
              className={styles.PlayVideoRigth}
              onClick={() => setPlaying(!playing)}
            >
              {playing ? 'x' : '>'}
            </button>

            <button
              className={styles.MuteVideoRight}
              onClick={() => setMuted(!muted)}
            >
              <BsMicMute className={styles.buttonBeMute} />
              {muted ? '' : ''}
            </button>

            <button
              className={styles.OffVideoRight}
              onClick={() => setOffVideo(true)}
            >
              Off
            </button>
          </div>
        </>
      ) : (
        <div className={styles.VideoOffMessage}>
          <p>Off</p>
          <button
            className={styles.PlayVideoRigth}
            onClick={() => setOffVideo(false)}
          >
            Live
          </button>
        </div>
      )}
    </div>
  );
}

export default VideoScreenLeft;
