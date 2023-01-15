import { Video } from '@common/types/video';
import { Card, Text } from '@mantine/core';
import Link from 'next/link';

interface Props {
  video: Video;
}

const VideoTeaser = ({ video }: Props) => {
  return (
    <Link href={`/watch/${video.id}`}>
      <Card shadow="sm" p="xl">
        <Text weight="500" size="lg">
          {video.title}
        </Text>
      </Card>
      <Text size="sm">{video.description}</Text>
    </Link>
  );
};
export default VideoTeaser;
