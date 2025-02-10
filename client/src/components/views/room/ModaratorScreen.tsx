import ReactPlayer from 'react-player/lazy';
import styles from './ModaratorScreen.module.css';
import { useEffect, useState } from 'react';
import RequestContainer from './ModeratorView_Container/FooterControl/RequestContainer';
import FooterScreenContainer from './ModeratorView_Container/FooterControl/FooterScreen_Container';

// function ModaratorScreen() {
//   const [playing, setPlaying] = useState(false);
//   const [muted, setMuted] = useState(true);
//   const [offVideo, setOffVideo] = useState(false);

//   const handleMuteToggle = () => {
//     console.log('Mute button clicked:', muted);
//     setMuted((prevMuted) => {
//       const newMuted = !prevMuted;
//       console.log('New muted state:', newMuted);
//       return newMuted;
//     });
//   };

const ModaratorScreen = ({
  stream,
  muteVideos,
}: {
  stream: MediaStream | null;
  muteVideos: boolean;
}) => {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    setMuted(muteVideos);
  }, [muteVideos]);

  const validStreamUrl =
    stream || 'https://youtube.com/shorts/B3v6FmRvuWk?si=-YRtjbeANbhSg4XT';

  return (
    <div className={styles.VideoModaratorScreenContainer}>
      {/* <div className={styles.request_Container}>
        <RequestContainer />
      </div> */}
      {/* <div>
        <FooterScreenContainer />
      </div> */}

      {stream ? (
        <ReactPlayer
          className={styles.VideoScreenRigth}
          url={validStreamUrl}
          playing={playing}
          muted={muted}
          width="130px"
          height="130px"
        />
      ) : (
        <p>Cargando video...</p>
      )}

      {/* Controles fijos en la parte inferior */}
      <div className={styles.VideoModaratorControls}>
        <button
          className={styles.PlayVideoRigth}
          onClick={() => setPlaying(!playing)}
        >
          {playing ? 'Pause' : 'Play'}
        </button>

        <button
          className={styles.MuteVideoRight}
          onClick={() => setMuted(!muted)}
        >
          {/* <BsMicMute className={styles.buttonBeMute} /> */}
          {muted ? 'UnMute' : 'Mute'}
        </button>

        <button
          className={styles.OffVideoRight}
          onClick={() => setPlaying(false)}
        >
          Off
        </button>
      </div>
    </div>
  );
};

export default ModaratorScreen;
