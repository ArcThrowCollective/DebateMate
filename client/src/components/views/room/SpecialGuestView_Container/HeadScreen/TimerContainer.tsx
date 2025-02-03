import { useState } from 'react';
import styles from './TimerContainer.module.css';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

const TimerContainer = ({ setMuteVideos }) => {
  if (!setMuteVideos || typeof setMuteVideos !== 'function') {
    console.error('setMuteVideos no se pasó correctamente a TimerContainer.');
  }

  const [playing, setPlaying] = useState(false);
  const [key, setKey] = useState(0);
  const [showTimer, setShowTimer] = useState(true); // Estado para mostrar/ocultar el temporizador

  return (
    <>
      {/* 🔹 Temporizador arriba */}
      <div className={styles.TheContainer}>
        <div className={styles.TimerContainer}>
          {showTimer && (
            <CountdownCircleTimer
              key={key}
              size={150}
              isPlaying={playing}
              duration={55}
              colors={['#6d25ff', '#c362ff', '#FFB662', '#FFB662']}
              colorsTime={[30, 20, 10, 0]}
              onComplete={() => {
                if (setMuteVideos && typeof setMuteVideos === 'function') {
                  setMuteVideos(true);
                } else {
                  console.error('setMuteVideos no es una función válida.');
                }
                return { shouldRepeat: false };
              }}
            >
              {({ remainingTime }) => (
                <div className={styles.timerNumber}>{remainingTime}</div>
              )}
            </CountdownCircleTimer>
          )}
        </div>

        {/* 🔹 Controles fijados en la parte inferior */}
        <div className={styles.TimerControls}>
          <button
            className={styles.controlButton}
            onClick={() => setPlaying((prev) => !prev)}
            disabled={!showTimer}
          >
            {playing ? 'Stop' : 'Start'}
          </button>

          <button
            className={styles.controlButton}
            onClick={() => setShowTimer((prev) => !prev)}
          >
            {showTimer ? 'Timer' : 'D'}
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
    </>
  );
};

export default TimerContainer;
