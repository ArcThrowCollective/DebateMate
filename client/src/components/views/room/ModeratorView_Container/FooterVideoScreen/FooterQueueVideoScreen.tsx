import { FunctionComponent } from 'react';
import styles from './FooterQueueVideoScreen.module.css';

const FooterQueueVideoScreen: FunctionComponent = () => {
  return (
    <div className={styles.VideoScreenModaratorContainer}>
      <div className={styles.HeadRoomScreen}>
        <HeadRoomScreen />
      </div>
    </div>
  );
};

export default FooterQueueVideoScreen;
