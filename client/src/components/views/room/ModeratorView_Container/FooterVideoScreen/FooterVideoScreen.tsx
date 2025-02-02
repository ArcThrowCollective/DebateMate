
const FooterVideoScreen: FunctionComponent = () => {
  return (
    <div className={styles.VideoScreenModaratorContainer}>
      <div className={styles.VideoRoomScreen}>
        <VideoScreen />
      </div>

      <div className={styles.HeadRoomScreen}>
        <HeadRoomScreen />
      </div>
      <div className={styles.FooterRoomScreen}>
        <FooterModaratorControlContain />
      </div>
    </div>
  );
};

export default