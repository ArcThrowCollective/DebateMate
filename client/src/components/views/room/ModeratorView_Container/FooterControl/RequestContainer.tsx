import { FunctionComponent } from 'react';
import styles from '../FooterControl/RequestContainer.module.css';


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
};

export default RequestContainer;
