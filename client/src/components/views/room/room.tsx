<<<<<<< HEAD
import { FunctionComponent } from 'react';
// import HeadRoomScreen from './HeadRoomScreen';
// import FooterRoomScreen from './FooterRoomScreen';
import styles from './Room.module.css';
import RoomModarator from './VideoScreenModarator';

interface RoomProps {
  roomId: string;
}

const Room: FunctionComponent<RoomProps> = () => {
  return (
    <>
      <div className={styles.RoomContainer}>
        <RoomModarator />
      </div>
=======
import { FunctionComponent } from "react";
import HeadRoomScreen from "./HeadRoomScreen";
import FooterRoomScreen from "./FooterRoomScreen";

const  Room:FunctionComponent = () => {
  return (
    <>
    <div >
      <HeadRoomScreen />
      {/* here Vido stuff */}
      <FooterRoomScreen />
    </div>
>>>>>>> 41c665d404bb1604eb3d3142677e0e84265aec7b
    </>
  );
};

<<<<<<< HEAD
export default Room;
=======
export default Room;
>>>>>>> 41c665d404bb1604eb3d3142677e0e84265aec7b
