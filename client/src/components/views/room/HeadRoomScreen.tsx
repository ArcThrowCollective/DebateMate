<<<<<<< HEAD
import { FunctionComponent } from 'react';
import HeadViewScreenContainer from './SpecialGuestView_Container/HeadScreen/HeadViewScreen_Container';
import UserName_Card from './SpecialGuestView_Container/HeadScreen/UserName_Card';
import styles from './HeadRoomScreen.module.css';

const HeadRoomScreen: FunctionComponent = () => {
  return (
    <div className={styles.HeadRoomScreenContainer}>
      <HeadViewScreenContainer />

      <div className={styles.UserNameCardContainer}>
        <UserName_Card />
=======
import { FunctionComponent } from "react";
import HeadViewContainer from "./SpecialGuestView_Container/HeadScreen/HeadView_Container";
import UserName_Card from "./SpecialGuestView_Container/HeadScreen/UserName_Card"
import styles from "./HeadRoomScreen.module.css"

const  HeadRoomScreen:FunctionComponent = () => {
  return (
    <div className={styles.HeadRoomScreenContainer}>
      <HeadViewContainer />
      <div className={styles.UserNameCardContainer}>
      <UserName_Card />
>>>>>>> 41c665d404bb1604eb3d3142677e0e84265aec7b
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default HeadRoomScreen;
=======
export default HeadRoomScreen;
>>>>>>> 41c665d404bb1604eb3d3142677e0e84265aec7b
