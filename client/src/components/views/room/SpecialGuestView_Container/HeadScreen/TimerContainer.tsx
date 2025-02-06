import { useEffect, useState } from 'react';
import styles from './TimerContainer.module.css';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import {
  setRemainingTime,
  setTimerState,
} from '../../../../../state/timer/timerSlice';
import { useDispatch } from 'react-redux';
import { PiBoxingGloveFill } from 'react-icons/pi';
import { RootState } from '../../../../../state/store';

const TimerContainer = ({ setMuteVideos = () => {} }) => {
  if (!setMuteVideos || typeof setMuteVideos !== 'function') {
    console.error('setMuteVideos no se pasó correctamente a TimerContainer.');
  }
  const dispatch = useDispatch();
  const [playing, setPlaying] = useState(false);
  const [key, setKey] = useState(0);
  const [showTimer, setShowTimer] = useState(true);
  return (
    <>
      <div className={styles.TheContainer}>
        <div className={styles.TimerContainer}>
          {showTimer && (
            <CountdownCircleTimer
              key={key}
              size={120}
              isPlaying={playing}
              duration={55}
              colors={['#6d25ff', '#c362ff', '#FFB662', '#FFB662']}
              colorsTime={[30, 20, 10, 0]}
              onUpdate={(time) => {
                dispatch(setRemainingTime(time));
              }}
              onComplete={() => {
                dispatch(setTimerState({ isTimeOut: true }));
                if (setMuteVideos && typeof setMuteVideos === 'function') {
                  setMuteVideos(true);
                } else {
                  console.error('setMuteVideos no es una función válida.');
                }
                return { shouldRepeat: false };
              }}
            >
              {({ remainingTime }) => {
                return (
                  <div className={styles.timerNumber}>{remainingTime}</div>
                );
              }}
            </CountdownCircleTimer>
          )}
        </div>

        <div className={styles.TimerControls}>
          <div className={styles.controlButtonContainer}>
            <button
              className={styles.controlButton}
              onClick={() => setPlaying((prev) => !prev)}
              disabled={!showTimer}
            >
              {playing ? 'Stop' : 'Start'}
            </button>
            <button
              className={styles.controlButtonBoxin}
              onClick={() => setShowTimer((prev) => !prev)}
            >
              <PiBoxingGloveFill size={45} color="#6d25ff" opacity={0.7} />
              {showTimer ? '' : ''}
            </button>
            <button
              className={styles.controlButton}
              onClick={() => {
                setPlaying(false);
                setKey((prevKey) => prevKey + 1);
                if (setMuteVideos && typeof setMuteVideos === 'function') {
                  setMuteVideos(false);
                }
              }}
              disabled={!showTimer}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TimerContainer;
