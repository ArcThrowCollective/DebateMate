import ReactPlayer from 'react-player/lazy';
import styles from './ModaratorScreen.module.css';
import { useState } from 'react';
import RequestContainer from './ModeratorView_Container/FooterControl/RequestContainer';
import FooterScreenContainer from './ModeratorView_Container/FooterControl/FooterScreen_Container';

function ModaratorScreen() {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [offVideo, setOffVideo] = useState(false);

  const handleMuteToggle = () => {
    console.log('Mute button clicked:', muted);
    setMuted((prevMuted) => {
      const newMuted = !prevMuted;
      console.log('New muted state:', newMuted);
      return newMuted;
    });
  };

  return (
    <div className={styles.VideoModaratorScreenContainer}>
      <div className={styles.request_Container}>
        <RequestContainer />
      </div>
      <div>
        <FooterScreenContainer />
      </div>
      {!offVideo ? (
        <>
          <ReactPlayer
            className={styles.VideoScreenRigth}
            url="https://youtu.be/qCXupXXXncM?si=VRZgKcixZaDf9No7"
            width="135px"
            height="135px"
            loop={true}
            playing={playing}
            muted={muted}
          />
          {/* Controles de video */}
          <div className={styles.VideoModaratorControls}>
            <button
              className={styles.PlayVideoRigth}
              onClick={() => setPlaying(!playing)}
            >
              {playing ? 'Pause' : 'Play'}
            </button>

            <button
              className={styles.MuteVideoRight}
              onClick={handleMuteToggle} // ✅ Corrección del evento de clic
            >
              {muted ? 'UnMute' : 'Mute'}
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
