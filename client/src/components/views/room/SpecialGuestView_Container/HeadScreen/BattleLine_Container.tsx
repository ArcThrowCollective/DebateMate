import styles from './BattleLine.module.css';
import ProgressBar from '@ramonak/react-progress-bar';

const BattleLine = () => {
  return (
    <div className={styles.BattleLine}>
      <ProgressBar
        completed={90}
        bgColor="#D0CECE"
        baseBgColor="#FFB662"
        labelColor="#6d25ff"
        labelSize="18px"
        customLabel={styles.label}
        maxCompleted={100}
        width="400px"
      />
    </div>
  );
};

export default BattleLine;
