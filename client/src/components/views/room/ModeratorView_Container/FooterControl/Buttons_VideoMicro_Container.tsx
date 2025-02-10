import { FunctionComponent } from 'react';
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
};

export default ButtonsVideoMicroContainer;
