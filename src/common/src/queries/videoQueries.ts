import { queryKeys } from '@common/queryKeys';
import videoService from '@common/services/videoService';
import { Video } from '@common/types/video';
import { UseQueryOptions } from '@tanstack/react-query';

const videoQueries = {
  getVideos(): UseQueryOptions<Video[]> {
    return {
      queryKey: [queryKeys.getVideos],
      queryFn: () => videoService.getVideos(),
    };
  },

  getVideo(videoId: string): UseQueryOptions<Video> {
    return {
      queryKey: [queryKeys.getVideo, videoId],
      queryFn: () => videoService.getVideo(videoId),
    };
  },
} as const;

export default videoQueries;
