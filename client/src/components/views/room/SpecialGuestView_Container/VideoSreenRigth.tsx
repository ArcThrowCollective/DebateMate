import ReactPlayer from 'react-player/lazy';
import styles from './VideoScreenRigth.module.css';
import { useState } from 'react';

function VideoScreenRigth() {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [offVideo, setOffVideo] = useState(false);

  return (
    <div className={styles.VideoScreenContainer}>
      {!offVideo ? (
        <>
          <ReactPlayer
            className={styles.VideoScreenRigth}
            url="https://youtube.com/shorts/Zmc-kE5fN4k?si=V20DURqR0bqyH_sP"
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
              {playing ? 'Pause' : 'On'}
            </button>

            <button
              className={styles.MuteVideoRight}
              onClick={() => setMuted(!muted)}
            >
              {muted ? 'Unmute' : 'Mute'}
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
            OnLive
          </button>
        </div>
      )}
    </div>
  );
}

export default VideoScreenRigth;
