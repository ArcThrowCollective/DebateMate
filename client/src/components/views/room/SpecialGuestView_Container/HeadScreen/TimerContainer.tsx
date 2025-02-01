import { FunctionComponent } from 'react';
import styles from './TimerContainer.module.css';

const TimerContainer: FunctionComponent = () => {
  return (
    <div className={styles.TimerContainer}>
      <div className={styles.circletimer} />
      <div className={styles.b}>55</div>
    </div>
  );
};

export default TimerContainer;
