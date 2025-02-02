import { BsMicMute } from 'react-icons/bs';
import { FiVideoOff } from 'react-icons/fi';
import styles from './ButtonsModaratorControl.module.css';
import { PiBoxingGlove } from 'react-icons/pi';
import { FunctionComponent } from 'react';

interface ButtonsModaratorControlProps {
  setShowUserNameCard: (value: boolean | ((prev: boolean) => boolean)) => void;
}

const ButtonsModaratorControl: FunctionComponent<
  ButtonsModaratorControlProps
> = ({}) => {
  return (
    <div>
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
    </div>
  );
};

export default ButtonsModaratorControl;
