import { FunctionComponent, useState } from 'react';
import HeadViewScreenContainer from './SpecialGuestView_Container/HeadScreen/HeadViewScreen_Container';
import UserName_Card from './SpecialGuestView_Container/HeadScreen/UserName_Card';
import styles from './HeadRoomScreen.module.css';

const HeadRoomScreen: FunctionComponent = () => {
  const [showUserNameCard, setShowUserNameCard] = useState<boolean>(false);

  console.log(
    'Pasando setShowUserNameCard a ButtonsModaratorControl:',
    typeof setShowUserNameCard
  );
  console.log('showUserNameCard:', showUserNameCard); // Depuración
  console.log(
    'Pasando setShowUserNameCard a ButtonsModaratorControl:',
    setShowUserNameCard
  );
  return (
    <div className={styles.HeadRoomScreenContainer}>
      <HeadViewScreenContainer />

      <div className={styles.UserNameCardContainer}>
        <UserName_Card />
      </div>
    </div>
  );
};

export default HeadRoomScreen;
