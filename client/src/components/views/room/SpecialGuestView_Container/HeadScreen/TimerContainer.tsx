<<<<<<< HEAD
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
=======
import { FunctionComponent } from 'react';
import styles from './TimerContainer.module.css';


const TimerContainer:FunctionComponent = () => {
  	return (
    		<div className={styles.TimerContainer}>
      			<div className={styles.circletimer} />
      			<b className={styles.b}>55</b>
    		</div>);
};

>>>>>>> 41c665d404bb1604eb3d3142677e0e84265aec7b
export default TimerContainer;
