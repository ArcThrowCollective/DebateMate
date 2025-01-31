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
    </>
  );
};

export default Room;