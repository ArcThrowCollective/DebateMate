import React, { FunctionComponent } from 'react';
import { BsMicMute } from 'react-icons/bs';
import { FiVideoOff } from 'react-icons/fi';
import styles from './ButtonsModaratorControl.module.css';
import { PiBoxingGlove } from 'react-icons/pi';
// import UserName_Card from '../../SpecialGuestView_Container/HeadScreen/UserName_Card';

interface ButtonsModaratorControlProps {
  setShowUserNameCard: React.Dispatch<React.SetStateAction<boolean>>;
}

const ButtonsModaratorControl: FunctionComponent<
  ButtonsModaratorControlProps
> = ({ setShowUserNameCard }) => {
  return (
    <div>
      <div className={styles.buttonsControl}>
        <button>
          <FiVideoOff className={styles.buttonBeVideoOff} />
        </button>
        <button>
          <BsMicMute className={styles.buttonBeMute} />
        </button>
        <button
          onClick={() => {
            console.log('Botón PiBoxingGlove clickeado'); // Depuración
            setShowUserNameCard((prev: boolean) => !prev);
          }}
        >
          <PiBoxingGlove className={styles.buttonBoxingGlove} />
        </button>
      </div>
    </div>
  );
};

export default ButtonsModaratorControl;
