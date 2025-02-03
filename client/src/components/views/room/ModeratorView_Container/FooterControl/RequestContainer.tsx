import { FunctionComponent } from 'react';
import styles from '../FooterControl/RequestContainer.module.css';
import { ImCancelCircle } from 'react-icons/im';
import { FaRegCheckCircle } from 'react-icons/fa';
import { MdFrontHand } from 'react-icons/md';

const RequestContainer: FunctionComponent = () => {
  return (
    <div className={styles.request_Container}>
      <div className={styles.requestspeak}>
        <MdFrontHand className={styles.handIconRequest} />
        <div className={styles.userName}>JEAN</div>
      </div>

      <div className={styles.butonnorequestContainer}>
        <button className={styles.butonnoIcon}>
          <ImCancelCircle />
        </button>
        <button className={styles.buttonyesIcon}>
          <FaRegCheckCircle />
        </button>
      </div>
    </div>
  );
};

export default RequestContainer;
