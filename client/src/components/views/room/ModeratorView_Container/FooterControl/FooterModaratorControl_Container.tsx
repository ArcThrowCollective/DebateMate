import { FunctionComponent } from 'react';
import styles from '../FooterControl/FooterModaratorControl_Container.module.css';

import ButtonsVideoMicroContainer from '../FooterControl/Buttons_VideoMicro_Container';
import RequestContainer from "../FooterControl/RequestContainer";
import FooterScreenContainer from './FooterScreen_Container';

const FooterModaratorControlContain:FunctionComponent = () => {
  	return (
    	<div className={styles.footermodaratorcontrolContain}>

				<FooterScreenContainer />
       
					{/* Botones de micrófono y video (izquierda) */}
      <div className={styles.buttonsVideomicroContainer}>
        <ButtonsVideoMicroContainer />
      </div>

      {/* Botón de muteo (centro) */}
      <img className={styles.buttonmuteIcon} alt="Control buttons" src="src/assets/room-img/ButtonMute_icon.svg" />

      {/* Contenedor de solicitud de palabra (derecha) */}
      <div className={styles.requestContainer}>
        <RequestContainer />
      </div>

    </div>);
};

export default FooterModaratorControlContain;
