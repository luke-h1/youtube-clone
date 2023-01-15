import { SimpleGrid } from '@mantine/core';
import { ReactElement } from 'react';
import VideoTeaser from '../components/VideoTeaser';
import { useVideos } from '../context/VideoContext';
import HomePageLayout from '../layout/Home';

const HomePage = () => {
  const { videos } = useVideos();

  return (
    <div>
      <SimpleGrid cols={3}>
        {videos?.videos &&
          videos?.videos.map(video => (
            <VideoTeaser key={video.id} video={video} />
          ))}
      </SimpleGrid>
    </div>
  );
};

// eslint-disable-next-line func-names
HomePage.getLayout = function (page: ReactElement) {
  return <HomePageLayout>{page}</HomePageLayout>;
};
export default HomePage;
