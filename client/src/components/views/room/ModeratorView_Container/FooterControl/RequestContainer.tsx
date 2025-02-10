import { FunctionComponent, useState } from 'react';
import styles from '../FooterControl/RequestContainer.module.css';
import { ImCancelCircle } from 'react-icons/im';
import { FaRegCheckCircle } from 'react-icons/fa';
import { MdOutlineFrontHand } from 'react-icons/md';
import clsx from 'clsx';

const RequestContainer: FunctionComponent = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isAccepted, setIsAccepted] = useState(false);

  // 🔹 Si `isVisible` es false, el componente se oculta completamente
  if (!isVisible) return null;

  return (
    <div
      className={clsx(styles.request_Container, {
        [styles.accepted]: isAccepted,
      })}
    >
      <div className={styles.requestspeak}>
        <MdOutlineFrontHand className={styles.handIconRequest} />
        <div className={styles.userName}>JEAN</div>
      </div>

      <div className={styles.butonnorequestContainer}>
        {/* 🔹 Al hacer clic en este botón, el componente se cierra completamente */}
        <button
          className={styles.butonnoIcon}
          onClick={() => setIsVisible(false)}
        >
          <ImCancelCircle />
        </button>

        {/* 🔹 Al hacer clic en este botón, cambia el fondo a verde */}
        <button
          className={styles.buttonyesIcon}
          onClick={() => setIsAccepted(true)}
        >
          <FaRegCheckCircle />
        </button>
      </div>
    </div>
  );
};

export default RequestContainer;
