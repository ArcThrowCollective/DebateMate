import { FunctionComponent } from 'react';
import styles from '../HeaderScreen/HeadView_Container.module.css';


const HeadViewContainer:FunctionComponent = () => {
  	return (
				
    		<div className={styles.headviewContainer}>
            <img className={styles.debateLogoIcon} alt="" src="src/assets/room-img/55DEBATE-logo.svg" />
            <b className={styles.nametopic}>FLAT EARTH</b>
      			
            <div className={styles.liveContainer}>
        				<img className={styles.liveboxIcon} alt="" src="src/assets/room-img/liveBox.svg" />
        				
        				<img className={styles.personicon} alt="" src="src/assets/room-img/personIcon.svg" />
								<p className={styles.totalonline}>24</p>
      			</div>
    		</div>);
};

export default HeadViewContainer;
