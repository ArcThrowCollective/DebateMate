import { FunctionComponent } from 'react';
import styles from '../FooterControl/FooterModaratorControl_Container.module.css';

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
};

export default FooterModaratorControlContain;
