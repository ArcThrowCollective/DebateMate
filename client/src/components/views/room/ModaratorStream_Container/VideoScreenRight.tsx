// import { useEffect, useState } from 'react';
// import ReactPlayer from 'react-player/lazy';
// import styles from '../SpecialGuestView_Container/VideoScreenRigth.module.css';

// import { BsMicMute } from 'react-icons/bs';

// const VideoSreenRigth = ({
//   muteVideos,
//   stream,
// }: {
//   stream: MediaStream | null;
//   muteVideos: boolean;
// }) => {
//   const [playing, setPlaying] = useState(false);
//   const [muted, setMuted] = useState(true);

//   useEffect(() => {
//     setMuted(muteVideos);
//   }, [muteVideos]);

//   return (
//     <div className={styles.VideoScreenContainer}>
//       {stream ? (
//         <ReactPlayer
//           className={styles.VideoScreenPlayer}
//           url={stream}
//           playing={playing}
//           muted={muted}
//           width="40%"
//           height="100%"
//         />
//       ) : (
//         <p>Cargando video...</p>
//       )}
//       <div className={styles.VideoControls}>
//         <button
//           className={styles.PlayVideoRigth}
//           onClick={() => setPlaying(!playing)}
//         >
//           {playing ? 'x' : '>'}
//         </button>
//         <button
//           className={styles.MuteVideoRight}
//           onClick={() => setMuted(!muted)}
//         >
//           <BsMicMute className={styles.buttonBeMute} />
//           {muted ? '' : ''}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default VideoSreenRigth;
