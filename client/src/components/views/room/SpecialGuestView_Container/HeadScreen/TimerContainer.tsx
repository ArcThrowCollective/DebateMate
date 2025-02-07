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
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import { Modal } from '../../../../UI/modal/ShowModal';
import { Button } from '../../../../UI/buttons/Button';
import Avatar from '../../../../UI/avatar/Avatar';
import { IoColorFill } from 'react-icons/io5';

const TimerContainer = ({ setMuteVideos = () => {} }) => {
  if (!setMuteVideos || typeof setMuteVideos !== 'function') {
    console.error('setMuteVideos no se pasó correctamente a TimerContainer.');
  }

  const dispatch = useDispatch();
  const [playing, setPlaying] = useState(false);
  const [key, setKey] = useState(0);
  const [showTimer, setShowTimer] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [overlayType, setOverlayType] = useState<'vote' | null>(null);
  const votes = { up: 10, down: 2 }; // Simulación de votos (se debe conectar con Redux)

  const closeOverlay = () => {
    setShowModal(false);
    setOverlayType(null);
  };

  useEffect(() => {
    if (showModal) {
      setMuteVideos(true);
    }
  }, [showModal, setMuteVideos]);

  return (
    <>
      <div className={styles.TheContainer}>
        <div className={styles.logoTimer}>
          <img src="src/assets/room-img/DEBATE BG.png" alt="" />
        </div>
        <div>
          <div className={styles.TimerContainer}>
            {showTimer && (
              <CountdownCircleTimer
                key={key}
                size={1}
                isPlaying={playing}
                duration={55}
                strokeWidth={1}
                colors={['#e4e5e9', '#e4e5e9', '#e4e5e9', '#e4e5e9']}
                colorsTime={[30, 20, 10, 0]}
                trailColor="rgba(255, 255, 255, 0.1)"
                onUpdate={(time) => {
                  dispatch(setRemainingTime(time));
                }}
                onComplete={() => {
                  dispatch(setTimerState({ isTimeOut: true }));
                  setShowModal(true); // 🔹 Muestra el modal cuando llega a 0
                  setOverlayType('vote');
                  if (setMuteVideos && typeof setMuteVideos === 'function') {
                    setMuteVideos(true);
                  }
                  return { shouldRepeat: false };
                }}
              >
                {({ remainingTime }) => (
                  <div
                    className="text-[64px] text-[--dark-color] font-[1000] text-(--accent-color)"
                    style={{
                      color:
                        remainingTime <= 10
                          ? '#FFB662'
                          : remainingTime <= 25
                            ? '#cf82ff'
                            : remainingTime <= 35
                              ? '#cf82ff'
                              : remainingTime <= 45
                                ? '#6d25ff'
                                : 'var(--dark-color)',
                    }}
                  >
                    {remainingTime}
                  </div>
                )}
              </CountdownCircleTimer>
            )}
          </div>{' '}
        </div>

        <div className={styles.TimerControls}>
          <div className={styles.controlButtonContainer}>
            <button
              className={styles.controlButton}
              onClick={() => setPlaying(true)}
              disabled={playing}
            >
              Start
            </button>
            <button
              className={styles.controlButtonBoxin}
              onClick={() => setShowTimer((prev) => !prev)}
            >
              <PiBoxingGloveFill size={45} color="#ffb662" opacity={1} />
            </button>
            <button
              className={styles.controlButton}
              onClick={() => {
                setPlaying(false);
                setKey((prevKey) => prevKey + 1);
                setShowModal(false);
                setOverlayType(null);
                if (setMuteVideos && typeof setMuteVideos === 'function') {
                  setMuteVideos(false);
                }
              }}
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <Modal type={overlayType} onClose={closeOverlay}>
          <div className="flex flex-col gap-4 items-center p-10">
            <Avatar userName="username" />
            <h2 className="text-xl">Final Score</h2>
            <div className="flex gap-4">
              <div className="vote__up">
                <FaThumbsUp /> {votes.up}
              </div>
              <div className="vote__down">
                <FaThumbsDown /> {votes.down}
              </div>
            </div>
            <div className="flex gap-4">
              <h3 className="">Experience gained:</h3>
              <p>+130</p>
            </div>
          </div>

          <div className="flex flex-col gap-4 items-center mb-10">
            <p>Join the Debate</p>

            <Button onClick={closeOverlay}>Connect</Button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default TimerContainer;
