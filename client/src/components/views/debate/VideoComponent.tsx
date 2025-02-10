import React, { useEffect, useRef } from 'react';

type Props = {
  stream: MediaStream | null;
  error: string | null;
  videoRef: React.RefObject<HTMLVideoElement>;
};

const VideoChat = ({ stream, error, videoRef }: Props) => {
  const heightRef = useRef<number>(450);
  const widthRef = useRef<number>(450);

  const getProportionalSize = (maxWidth: number, maxHeight: number) => {
    const aspectRatio = widthRef.current / heightRef.current;

    let newWidth = maxWidth;
    let newHeight = Math.round(maxWidth / aspectRatio);

    if (newHeight > maxHeight) {
      newHeight = maxHeight;
      newWidth = Math.round(maxHeight * aspectRatio);
    }

    return { newWidth, newHeight };
  };

  //show the video feed
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
      stream.getVideoTracks().forEach((track) => {
        const capabilities = track.getCapabilities();
        console.log(capabilities);
        const maxHeight = capabilities.height?.max ?? heightRef.current;
        const maxWidth = capabilities.width?.max ?? widthRef.current;

        const { newWidth, newHeight } = getProportionalSize(
          maxWidth,
          maxHeight
        );

        track
          .applyConstraints({
            width: { exact: newWidth },
            height: { exact: newHeight },
          })
          .catch((err) => console.error('Failed to apply constraints:', err));

        widthRef.current = newWidth;
        heightRef.current = newHeight;
      });

      videoRef.current.onloadedmetadata = () => {
        videoRef.current
          ?.play()
          .catch((err) => console.error('Video play error:', err));
      };
    }
  }, [stream, videoRef]);

  return (
    <div className="relative">
      {error && <p>{error}</p>}
      <video
        ref={videoRef}
        style={{
          width: `${widthRef.current}px`,
          height: `${heightRef.current}px`,
        }}
      />
    </div>
  );
};

export default VideoChat;
