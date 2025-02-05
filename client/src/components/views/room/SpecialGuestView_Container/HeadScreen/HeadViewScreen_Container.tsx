import { FunctionComponent, useEffect } from 'react';
import styles from '../HeadScreen/HeadViewScreen_Container.module.css';
import { GrView } from 'react-icons/gr';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../state/store';
import { fetchRoomById } from '../../../../../utils/graphqlclient';
import { Room } from '../../../../../types/debate';

const HeadViewScreenContainer: FunctionComponent = () => {
  const roomId = useSelector((state: RootState) => state.navigation.roomId);
  let roomData: Room | null = null;
  useEffect(() => {
    console.log(roomId);
    if (roomId) {
      (async () => {
        roomData = await fetchRoomById(roomId);
      })();
    }
  }, []);
  return (
    <div className={styles.headviewContainer}>
      <div className={styles.live_Container}>
        <div className={styles.live}>LIVE</div>
        <div>
          <GrView className={styles.viewersIcon} />
        </div>
        <div className={styles.totalonline}>24</div>
      </div>

      <div className={styles.nametopic}>{roomData}</div>
    </div>
  );
};

export default HeadViewScreenContainer;
