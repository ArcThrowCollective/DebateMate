import { useEffect, useRef, useState } from 'react';

type Props = {
  //add
  onStreamReady: (stream: MediaStream) => void;
};
export default function Stream({ onStreamReady }: Props) {
  // note: MediaStream is a non-serializable object and can apparently not be used as a redux state...
  const [stream, setStream] = useState(new MediaStream());
  const refVideo = useRef<HTMLVideoElement>(null);

  // set local stream as source for html <video> element
  useEffect(() => {
    const getLocalStream = async () => {
      if (!refVideo.current) return;
      const localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        // audio: true,
      });
      setStream(stream);
      refVideo.current.srcObject = localStream;
      onStreamReady(localStream); //add
    };
    getLocalStream();
  }, [onStreamReady]); //add

  return (
    <>
      <video
        ref={refVideo}
        className="videoStream"
        autoPlay
        playsInline
        width="100%"
        height="100%"
      ></video>
    </>
  );
}
