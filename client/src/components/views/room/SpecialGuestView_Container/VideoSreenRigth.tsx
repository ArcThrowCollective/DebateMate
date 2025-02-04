import ReactPlayer from 'react-player/lazy';
import styles from './VideoScreenRigth.module.css';
import { useState } from 'react';
import { BsMicMute } from 'react-icons/bs';

function VideoScreenRigth() {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [offVideo, setOffVideo] = useState(false);

  return (
    <div className={styles.VideoScreenContainer}>
      {!offVideo ? (
        <>
          <ReactPlayer
            className={styles.VideoScreenPlayer}
            url="https://youtube.com/shorts/hqekUpBJ8oI?si=mgroWkizQjrBOAVE"
            width="100%"
            height="100%"
            loop={true}
            playing={playing}
            muted={muted}
          />

          {/* Contenedor de botones flotantes */}

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
          <p>Off Live</p>
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

export default VideoScreenRigth;
