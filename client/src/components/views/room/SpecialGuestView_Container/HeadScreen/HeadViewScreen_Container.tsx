import { FunctionComponent } from 'react';
import styles from '../HeadScreen/HeadViewScreen_Container.module.css';
import { GrView } from 'react-icons/gr';

const HeadViewScreenContainer: FunctionComponent = () => {
  return (
    <div className={styles.headviewContainer}>
      <div className={styles.live_Container}>
        <div className={styles.live}>LIVE</div>
        <div>
          <GrView className={styles.viewersIcon} />
        </div>
        <div className={styles.totalonline}>24</div>
      </div>

      <div className={styles.nametopic}>FLAT EARTH</div>
    </div>
  );
};

export default HeadViewScreenContainer;
