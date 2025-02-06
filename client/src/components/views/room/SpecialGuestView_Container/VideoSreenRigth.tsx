import { useEffect, useRef, useState } from 'react';
import styles from './VideoScreenRigth.module.css';
import { BsMicMute } from 'react-icons/bs';
import RemoteStream from '../../../RemoteStream';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../state/store';
import { AiFillLike } from 'react-icons/ai';
import { AiFillDislike } from 'react-icons/ai';
import { TrackSpeakerVotes } from '../../../UI/voting/Voting';

type Props = {
  muteVideos: boolean;
  streamUrl?: MediaStream | null;
};

function VideoScreenRigth({ muteVideos, streamUrl }: Props) {
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [offVideo, setOffVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const roomId = useSelector((state: RootState) => state.navigation.roomId);

  useEffect(() => {
    setMuted(muteVideos);
  }, [muteVideos]);

  useEffect(() => {
    if (videoRef.current && streamUrl) {
      videoRef.current.srcObject = streamUrl;
      videoRef.current.muted = muted;
      videoRef.current.loop = true;
      if (playing) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [streamUrl, playing, muted]);

  return (
    <div className={styles.VideoScreenContainer}>
      {!offVideo ? (
        <>
          <RemoteStream
            roomId={roomId!}
            userName="testUser"
            audio={true}
          ></RemoteStream>

          <div className={styles.VideoControls}>
            <div className="mr-20">
              <TrackSpeakerVotes speakerId={'speakerId'} />
            </div>
            <button
              className={styles.PlayVideoRigth}
              onClick={() => setPlaying(!playing)}
            >
              {playing ? '||' : 'Play'}
            </button>

            <button
              className={styles.MuteVideoRight}
              onClick={() => setMuted(!muted)}
            >
              <BsMicMute className={styles.buttonBeMute} />
              {muted ? 'Unmute' : ''}
            </button>

            <button
              className={styles.OffVideoRight}
              onClick={() => setOffVideo(true)}
            >
              Off
            </button>
          </div>
        </>
      ) : (
        <div className={styles.VideoOffMessage}>
          <p>Off</p>
          <button
            className={styles.PlayVideoRigth}
            onClick={() => setOffVideo(false)}
          >
            Live
          </button>
        </div>
      )}
    </div>
  );
}

export default VideoScreenRigth;
