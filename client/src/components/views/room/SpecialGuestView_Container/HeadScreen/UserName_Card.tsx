import { FunctionComponent } from 'react';
import styles from './UserName_Card.module.css';
import TimerContainer from './TimerContainer';
<<<<<<< HEAD
import BattleLine from './BattleLine_Container';

const UserName_Card: FunctionComponent = () => {
  return (
    <div className={styles.usernameheadContainer}>
      <div className={styles.leftcarduser}>
        <div className={styles.avataruserleftcardheadIcon} />
        <div className={styles.usernameLeft}>PHILL</div>
      </div>
      <div className={styles.BattleLine}>
        <BattleLine />
      </div>

      <div className={styles.TimerContainer}>
        <TimerContainer />
      </div>

      <div className={styles.rightcarduser}>
        <div className={styles.usernameRight}>BEN</div>
        <div className={styles.avataruserrightcardheadIcon} />
      </div>
    </div>
  );
};

export default UserName_Card;
=======

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
>>>>>>> 41c665d404bb1604eb3d3142677e0e84265aec7b
