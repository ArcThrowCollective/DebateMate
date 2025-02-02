import { FunctionComponent } from 'react';
import styles from './FooterModaratorRoomScreen.module.css';
import ButtonsVideoMicroContainer from './ModeratorView_Container/FooterControl/Buttons_VideoMicro_Container';
import FooterScreenContainer from './ModeratorView_Container/FooterControl/FooterScreen_Container';
import RequestContainer from './ModeratorView_Container/FooterControl/RequestContainer';
// import ButtonsReactContainer from './SpecialGuestView_Container/ButtonsReact_Container/ButtonsReact_Container';
import FooterControlContain from './SpecialGuestView_Container/FooterControl/FooterControl_Container';
const FooterModaratorRoomScreen: FunctionComponent = () => {
  return (
    <div className={styles.footermodaratorcontrolContain}>
      <FooterScreenContainer />

      {/* Botones de micrófono y video (izquierda) */}
      <div className={styles.buttonsVideomicroContainer}>
        <ButtonsVideoMicroContainer />
      </div>

      {/* Contenedor de solicitud de palabra (derecha) */}
      <div className={styles.requestContainer}>
        <RequestContainer />
      </div>
      <div>
        <FooterControlContain />
      </div>
    </div>
  );
};

export default FooterModaratorRoomScreen;
