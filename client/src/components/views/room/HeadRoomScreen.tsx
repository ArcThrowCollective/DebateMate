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
      </div>
    </div>
  );
};

export default HeadRoomScreen;