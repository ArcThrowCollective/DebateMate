import { FunctionComponent, useState } from 'react';
import HeadViewScreenContainer from './SpecialGuestView_Container/HeadScreen/HeadViewScreen_Container';
import UserName_Card from './SpecialGuestView_Container/HeadScreen/UserName_Card';
import styles from './HeadRoomScreen.module.css';
import ButtonsModaratorControl from './ModeratorView_Container/FooterControl/ButtonsModaratorControl_Container';

const HeadRoomScreen: FunctionComponent = () => {
  const [showUserNameCard, setShowUserNameCard] = useState<boolean>(false);
  console.log('showUserNameCard:', showUserNameCard); // Depuración
  return (
    <div className={styles.HeadRoomScreenContainer}>
      <HeadViewScreenContainer />
      <ButtonsModaratorControl setShowUserNameCard={setShowUserNameCard} />

      {showUserNameCard && (
        <div className={styles.UserNameCardContainer}>
          <UserName_Card />
        </div>
      )}
    </div>
  );
};

export default HeadRoomScreen;
