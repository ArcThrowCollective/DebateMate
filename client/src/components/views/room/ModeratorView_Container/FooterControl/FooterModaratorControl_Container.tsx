import { FunctionComponent } from 'react';
import styles from '../FooterControl/FooterModaratorControl_Container.module.css';

<<<<<<< HEAD
// import ButtonsVideoMicroContainer from '../FooterControl/Buttons_VideoMicro_Container';
// import ButtonsModaratorControl from './ButtonsModaratorControl_Container';
import RequestContainer from '../FooterControl/RequestContainer';
import FooterScreenContainer from './FooterScreen_Container';

const FooterModaratorControlContain: FunctionComponent = () => {
  return (
    <div className={styles.footermodaratorcontrolContain}>
      <FooterScreenContainer />

      <div className={styles.buttonsVideomicroContainer}>
        {/* <ButtonsVideoMicroContainer /> */}
      </div>

      <div>{/* <ButtonsModaratorControl /> */}</div>

      <div className={styles.requestContainer}>
        <RequestContainer />
      </div>
    </div>
  );
=======
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
>>>>>>> 41c665d404bb1604eb3d3142677e0e84265aec7b
};

export default FooterModaratorControlContain;
