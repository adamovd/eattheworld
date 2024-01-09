import { VideoContainer } from "../Styles/Components/Containers";

const LandingVideo = () => {
  return (
    <VideoContainer
      src="https://utfs.io/f/6ae7e849-092f-4c65-b919-7a64f8072989-my3ix4.mp4"
      autoPlay
      muted
      loop
      playsInline
    ></VideoContainer>
  );
};

export default LandingVideo;
