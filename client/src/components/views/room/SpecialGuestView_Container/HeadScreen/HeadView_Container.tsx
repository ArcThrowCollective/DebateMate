import { FunctionComponent } from 'react';
import styles from '../HeadScreen/HeadView_Container.module.css';

const HeadViewContainer:FunctionComponent = () => {
  	return (
				
    		<div className={styles.headviewContainer}>
            <img className={styles.debateLogoIcon} alt="" src="src/assets/room-img/55DEBATE-logo.svg" />	
            <div className={styles.liveContainer}>
        				<img className={styles.liveboxIcon} alt="" src="src/assets/room-img/liveBox.svg" />				
        				<img className={styles.personicon} alt="" src="src/assets/room-img/personIcon.svg" />
								<p className={styles.totalonline}>24</p>
      			</div>
						<div className={styles.nametopic}>FLAT EARTH</div>
    		</div>);
};

export default HeadViewContainer;
