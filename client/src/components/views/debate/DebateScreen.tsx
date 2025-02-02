import useUserMedia from '../../../hooks/useUserMedia';
import VideoChat from './VideoComponent';
import { FaHandPaper, FaUser } from 'react-icons/fa';
import { BsFillCameraVideoFill } from 'react-icons/bs';
import { FaMicrophoneAlt } from 'react-icons/fa';
import { FaThumbsUp } from 'react-icons/fa';

type Props = {};

const DebateRoom = (props: Props) => {
  const { stream, error, videoRef } = useUserMedia({
    video: true,
    audio: false,
  });
  return (
    <div className="bg-slate-400 relative min-h-screen flex flex-col justify-between">
      <VideoChat stream={stream} error={error} videoRef={videoRef} />
      <div className="bg-black inset-0 w-full h-52 absolute flex flex-col">
        <div className="justify-start p-5 text-left">
          <div className="text-3xl text-white ">Logo</div>
          <div className="flex items-center space-x-2">
            <div className="text-yellow-500 gap-x-2 border p-1">live</div>
            <FaUser className="text-white" />
            <div className="text-white">userCount</div>
          </div>
          <div className="">
            <div className="text-[50px] text-white">topicTitle</div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 bg-black h-64 w-full p-2 flex gap-5">
        <div className="flex gap-x-6  h-14 w-1/2">
          <div className="p-5 rounded-full bg-slate-200">
            <FaMicrophoneAlt />
          </div>
          <div className="p-5 rounded-full bg-slate-200">
            <BsFillCameraVideoFill />
          </div>
        </div>
        <div className="flex gap-x-6 h-14">
          <div className="p-5 rounded-full bg-slate-200">
            <FaThumbsUp />
          </div>
          <div className="p-5 rounded-full bg-slate-200">
            <FaHandPaper />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DebateRoom;
