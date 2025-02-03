import { FunctionComponent } from 'react';
<<<<<<< HEAD
import { FaMicrophone } from 'react-icons/fa';
import { IoVideocam } from 'react-icons/io5';
import styles from '../FooterControl/Buttons_VideoMicro_Container.module.css';

const ButtonsVideoMicroContainer: FunctionComponent = () => {
  return (
    <div className={styles.buttonsVideomicroContainer}>
      <button>
        <IoVideocam className={styles.buttonvideoIcon} />
      </button>
      <button>
        <FaMicrophone className={styles.buttonmicroIcon} />
      </button>
    </div>
  );
=======
import styles from '../FooterControl/Buttons_VideoMicro_Container.module.css';


const ButtonsVideoMicroContainer:FunctionComponent = () => {
  	return (
    		<div className={styles.buttonsVideomicroContainer}>
					<button><img className={styles.buttonvideoIcon} alt="Button Video" src="src/assets/room-img/ButtonVideo.svg" /></button>
					<button><img className={styles.buttonmicroIcon} alt="Button Micro" src="src/assets/room-img/ButtonMicro.svg" /></button>
    		</div>);
>>>>>>> 41c665d404bb1604eb3d3142677e0e84265aec7b
};

export default ButtonsVideoMicroContainer;
