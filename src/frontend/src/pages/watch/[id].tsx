/* eslint-disable jsx-a11y/media-has-caption */
import { useRouter } from 'next/router';

const WatchPage = () => {
  const router = useRouter();

  const id = router.query.id as string;
  return (
    <div>
      <video
        src={`http://localhost:4000/videos/${id}`}
        controls
        width="800px"
        height="auto"
        id="video-player"
      />
    </div>
  );
};

export default WatchPage;
