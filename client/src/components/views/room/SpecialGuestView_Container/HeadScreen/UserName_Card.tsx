import { FunctionComponent } from 'react';
import styles from './UserName_Card.module.css';
import TimerContainer from './TimerContainer';

const UserName_Card: FunctionComponent = () => {
  return (
    <div className={styles.usernameheadContainer}>
      <div className={styles.TimerContainer}>
        <TimerContainer />
      </div>
    </div>
  );
};

export default UserName_Card;
