import { FunctionComponent } from 'react';
import styles from './UserName_Card.module.css';
import TimerContainer from './TimerContainer';

const UserNameHeadContainer:FunctionComponent = () => {
  	return (
    		<div className={styles.usernameheadContainer}>
					
      			<div className={styles.leftcarduser}>
        			<img className={styles.avataruserleftcardheadIcon} alt="" src="src/assets/room-img/AvatarUserLeftCardHead.svg" />
        			<div className={styles.usernameLeft}>PHILL</div>
      			</div>
						<TimerContainer />
      			<div className={styles.rightcarduser}>
        			<div className={styles.usernameRight}>BEN</div>
        			<img className={styles.avataruserrightcardheadIcon} alt="" src="src/assets/room-img/AvatarUserRightCardHead.svg" />
						</div>


    		</div>);
};

export default UserNameHeadContainer;
