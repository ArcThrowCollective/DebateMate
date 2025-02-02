import { useEffect, useState, useRef } from 'react';

// Custom hook for userMediaDevices like video or audio
const useUserMedia = (constraints: MediaStreamConstraints) => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const enableStream = async () => {
      try {
        const userStream =
          await navigator.mediaDevices.getUserMedia(constraints);
        const supportedConstraints =
          await navigator.mediaDevices.getSupportedConstraints();
        console.log(supportedConstraints);
        setStream(userStream);
      } catch (err) {
        setError('Failed to access media devices.');
      }
    };

    enableStream();

    return () => {
      // Cleanup when component unmounts
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return { stream, error, videoRef };
};

export default useUserMedia;
