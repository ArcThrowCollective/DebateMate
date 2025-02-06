import { FunctionComponent } from 'react';
import styles from './UserName_Card.module.css';
import TimerContainer from './TimerContainer';
import BattleLine from './BattleLine_Container';

const UserName_Card: FunctionComponent = () => {
  return (
    <div className={styles.usernameheadContainer}>
      {/* <div className={styles.leftcarduser}>
        <div className={styles.usernameLeft}>PHILL</div>
      </div> */}
      {/* <div className={styles.BattleLine}>
        <BattleLine />
      </div> */}

      <div className={styles.TimerContainer}>
        <TimerContainer />
      </div>

      {/* <div className={styles.rightcarduser}>
        <div className={styles.usernameRight}>BEN</div> */}
      {/* <div className={styles.avataruserrightcardheadIcon} /> */}
      {/* </div> */}
    </div>
  );
};

export default UserName_Card;
