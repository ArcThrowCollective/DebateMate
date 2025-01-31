import { FunctionComponent } from 'react';
import styles from "./FooterControl_Container.module.css";

import ButtonsVideoMicroContainer from '../../ModeratorView_Container/FooterControl/Buttons_VideoMicro_Container';
import FooterScreenContainer from '../../ModeratorView_Container/FooterControl/FooterScreen_Container';
import ButtonsReactContainer from "../ButtonsReact_Container/ButtonsReact_Container"

const FooterControlContain:FunctionComponent = () => {
  	return (
    	<div className={styles.footermodaratorcontrolContain}>

				<FooterScreenContainer />      
			
      <div className={styles.buttonsVideomicroContainer}>
        <ButtonsVideoMicroContainer />
      </div>

      <div className={styles.footerscreenContainer}>
        <ButtonsReactContainer  />
      </div>

    </div>);
};

export default FooterControlContain;
