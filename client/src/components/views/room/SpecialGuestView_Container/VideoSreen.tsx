import ReactPlayer from 'react-player';
import styles from './VideoScreen.module.css';

function VideoScreen() {
  const handleError = (error: any) => {
    console.error('Error playing media:', error);
    // Handle the error, for example, by displaying a notification to the user
  };

  return (
    <div className={styles.VideoScreenContsiner}>
      <ReactPlayer
        className={styles.VideoScreenLeft}
        url="https://youtube.com/shorts/vI_isDWlP9k?si=rsVPNInatxrxAAdt"
        onError={handleError}
        width="45%"
        height="100%"
      />
      ;
      <ReactPlayer
        className={styles.VideoScreenRigth}
        url="https://youtube.com/shorts/XU0kJIi-JN8?si=Vz-XniEVLaRFleP8"
        width="45%"
        height="100%"
      />
    </div>
  );
}

export default VideoScreen;
