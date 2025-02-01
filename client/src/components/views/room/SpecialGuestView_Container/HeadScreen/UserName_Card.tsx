import { FunctionComponent } from 'react';
import styles from './UserName_Card.module.css';
import TimerContainer from './TimerContainer';
import BattleLine from './BattleLine_Container';
const UserNameHeadContainer: FunctionComponent = () => {
  return (
    <div className={styles.usernameheadContainer}>
      <div className={styles.leftcarduser}>
        <div className={styles.avataruserleftcardheadIcon} />
        <div className={styles.usernameLeft}>PHILL</div>
      </div>
      <div className={styles.BattleLine}>
        <BattleLine />
      </div>

      <TimerContainer />

      <div className={styles.rightcarduser}>
        <div className={styles.usernameRight}>BEN</div>
        <div className={styles.avataruserrightcardheadIcon} />
      </div>
    </div>
  );
};

export default UserNameHeadContainer;
