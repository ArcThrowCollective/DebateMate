import { FunctionComponent } from 'react';
import styles from '../FooterControl/RequestContainer.module.css';
<<<<<<< HEAD
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
=======


const RequestContainer:FunctionComponent = () => {
  	return (
    		<div className={styles.requestContainer}>
      			<div className={styles.requestspeak} />
      			<img className={styles.butonnoIcon} alt="Button No" src="src/assets/room-img/ButonNO_icon.svg" />
      			<img className={styles.buttonyesIcon} alt="Button Yes" src="src/assets/room-img/ButtonYES_icon.svg" />
      			<img className={styles.userright1AvatarIcon} alt="" src="src/assets/room-img/userRight1_ Avatar.png" />
      			<div className={styles.jean}>JEAN</div>
      			<div className={styles.request}>Request</div>
    		</div>);
>>>>>>> 41c665d404bb1604eb3d3142677e0e84265aec7b
};

export default RequestContainer;
