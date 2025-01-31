import { FunctionComponent } from 'react';
import styles from "../FooterControl/FooterScreen_Container.module.css"

const FooterScreenContainer:FunctionComponent = () => {
  	return (
    		<div className={styles.footerscreenContainer}>
      			<div className={styles.participantsContainer}></div>
						<div className={styles.ModeratorRoom}></div>  
    		</div>
				);

};

export default FooterScreenContainer;
