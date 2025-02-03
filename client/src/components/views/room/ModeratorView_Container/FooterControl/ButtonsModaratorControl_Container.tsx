import { FunctionComponent } from 'react';
import { BsMicMute } from 'react-icons/bs';
import { FiVideoOff } from 'react-icons/fi';
import styles from './ButtonsModaratorControl.module.css';
import { PiBoxingGlove } from 'react-icons/pi';

const ButtonsModaratorControl: FunctionComponent = () => {
  return (
    <div className={styles.buttonsControl}>
      <button>
        <FiVideoOff className={styles.buttonBeVideoOff} />
      </button>
      <button>
        <BsMicMute className={styles.buttonBeMute} />
      </button>
      <button>
        <PiBoxingGlove className={styles.buttonBoxingGlove} />
      </button>
    </div>
  );
};

export default ButtonsModaratorControl;
