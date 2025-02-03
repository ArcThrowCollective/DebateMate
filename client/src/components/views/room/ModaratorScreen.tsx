import ReactPlayer from 'react-player/lazy';
import styles from './ModaratorScreen.module.css';
import { useState } from 'react';

function ModaratorScreen() {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [offVideo, setOffVideo] = useState(false);

  return (
    <div className={styles.VideoScreenContainer}>
      {!offVideo ? (
        <>
          <ReactPlayer
            className={styles.VideoScreenRigth}
            url="https://youtube.com/shorts/XU0kJIi-JN8?si=Vz-XniEVLaRFleP8"
            width="125px"
            height="125px"
            loop={true}
            playing={playing}
            muted={muted}
          />

          {/* Controles de video dentro de ModaratorScreen */}
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

export default ModaratorScreen;
