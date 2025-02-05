import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player/lazy';
// import styles from '../SpecialGuestView_Container/VideoScreenRigth.module.css';
import styles from './ ModaratorScreen.module.css';
import RequestContainer from '../ModeratorView_Container/FooterControl/RequestContainer';
import FooterScreenContainer from '../ModeratorView_Container/FooterControl/FooterScreen_Container';
import { BsMicMute } from 'react-icons/bs';

const ModaratorScreen = ({
  muteVideos,
  stream,
}: {
  stream: MediaStream | null;
  muteVideos: boolean;
}) => {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    setMuted(muteVideos);
  }, [muteVideos]);

  const handleMuteToggle = () => {
    console.log('Mute button clicked:', muted);
    setMuted((prevMuted) => {
      const newMuted = !prevMuted;
      console.log('New muted state:', newMuted);
      return newMuted;
    });
  };

  return (
    <div className={styles.VideoScreenContainer}>
      <div className={styles.request_Container}>
        <RequestContainer />
      </div>
      <div>
        <FooterScreenContainer />
      </div>

      {stream ? (
        <ReactPlayer
          className={styles.VideoScreenRigth}
          url={stream}
          playing={playing}
          muted={muted}
          width="130px"
          height="130px"
        />
      ) : (
        <p>Cargando video...</p>
      )}
      <div className={styles.butt}>
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
      </div>
    </div>
  );
};

export default ModaratorScreen;
