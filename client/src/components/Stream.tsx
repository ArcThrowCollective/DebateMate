import { useEffect, useRef, useState } from 'react';

export default function Stream() {
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
    };
    getLocalStream();
  }, []);

  return (
    <>
      <video
        ref={refVideo}
        className="videoStream"
        autoPlay
        playsInline
      ></video>
    </>
  );
}
