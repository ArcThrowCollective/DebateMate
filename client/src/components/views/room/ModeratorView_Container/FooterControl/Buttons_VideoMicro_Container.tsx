import { FunctionComponent } from 'react';
import styles from '../FooterControl/Buttons_VideoMicro_Container.module.css';


const ButtonsVideoMicroContainer:FunctionComponent = () => {
  	return (
    		<div className={styles.buttonsVideomicroContainer}>
					<button><img className={styles.buttonvideoIcon} alt="Button Video" src="src/assets/room-img/ButtonVideo.svg" /></button>
					<button><img className={styles.buttonmicroIcon} alt="Button Micro" src="src/assets/room-img/ButtonMicro.svg" /></button>
    		</div>);
};

export default ButtonsVideoMicroContainer;
