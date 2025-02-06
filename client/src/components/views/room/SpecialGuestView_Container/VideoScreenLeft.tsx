import { useEffect, useRef, useState } from 'react';
import styles from './VideoScreenRigth.module.css';
import { BsMicMute } from 'react-icons/bs';
import Stream from '../../../Stream';
import { AiFillLike } from 'react-icons/ai';
import { AiFillDislike } from 'react-icons/ai';
import { TrackSpeakerVotes } from '../../../UI/voting/Voting';

type Props = {
  muteVideos: boolean;
  streamUrl?: MediaStream | null;
};

function VideoScreenLeft({ muteVideos, streamUrl }: Props) {
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [offVideo, setOffVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    setMuted(muteVideos);
  }, [muteVideos]);

  useEffect(() => {
    if (videoRef.current && (streamUrl || localStream)) {
      videoRef.current.srcObject = streamUrl || localStream;
      videoRef.current.muted = muted;
      videoRef.current.loop = true;
      if (playing) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [streamUrl, playing, muted, localStream]);

  return (
    <div className={styles.VideoScreenContainer}>
      {!offVideo ? (
        <>
          <Stream onStreamReady={setLocalStream}></Stream>
          <div className={styles.rightcarduser}>
            <div className={styles.usernameLeft}>PHILL</div>
            {/* <div className={styles.avataruserrightcardheadIcon} /> */}
          </div>
          <div className={styles.VideoControls}>
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

            <div className="ml-20">
              <TrackSpeakerVotes speakerId={'speakerId'} />
            </div>

            {/* <button>
              <AiFillDislike className={styles.dislike} />
            </button>
            <button>
              <AiFillLike className={styles.like} />
            </button> */}

            <div className={styles.footerscreenContainer}>
              <div className={styles.participantsContainer}></div>
              <div className={styles.ModeratorRoom}></div>
            </div>
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

export default VideoScreenLeft;
