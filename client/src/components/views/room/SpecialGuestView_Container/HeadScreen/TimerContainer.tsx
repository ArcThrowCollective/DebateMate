import { FunctionComponent } from 'react';
import styles from './TimerContainer.module.css';


const TimerContainer:FunctionComponent = () => {
  	return (
    		<div className={styles.TimerContainer}>
      			<div className={styles.circletimer} />
      			<b className={styles.b}>55</b>
    		</div>);
};

export default TimerContainer;
