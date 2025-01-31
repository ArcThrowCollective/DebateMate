import React, { useEffect, useRef } from 'react';
import useUserMedia from '../hooks/useUserMedia';
type Props = {
  stream: MediaStream | null;
  error: string | null;
  videoRef: React.RefObject<HTMLVideoElement>;
};
const VideoChat = ({ stream, error, videoRef }: Props) => {
  return (
    <div>
      {error && <p>{error}</p>}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{ width: '400px', border: '1px solid black' }}
      />
    </div>
  );
};
export default VideoChat;
