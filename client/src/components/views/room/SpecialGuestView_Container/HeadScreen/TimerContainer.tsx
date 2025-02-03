import styles from './TimerContainer.module.css';

import { CountdownCircleTimer } from 'react-countdown-circle-timer';

const TimerContainer = () => (
  <div className={styles.TimerContainer}>
    <CountdownCircleTimer
      size={150}
      isPlaying
      duration={55}
      colors={['#6d25ff', '#c362ff', '#FFB662', '#FFB662']}
      colorsTime={[30, 20, 10, 0]}
    >
      {({ remainingTime }) => (
        <div className={styles.timerNumber}>{remainingTime}</div>
      )}
    </CountdownCircleTimer>
  </div>
);
export default TimerContainer;
