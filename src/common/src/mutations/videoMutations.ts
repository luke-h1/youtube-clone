import { queryKeys } from '@common/queryKeys';
import videoService, { VideoEditPayload } from '@common/services/videoService';
import { Video } from '@common/types/video';
import { UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

const videoMutations = {
  editVideo(): UseMutationOptions<
    Video,
    AxiosError,
    VideoEditPayload & { videoId: string }
  > {
    return {
      mutationFn: ({ videoId, ...payload }) =>
        videoService.editVideo({ videoId, ...payload }),
      mutationKey: [queryKeys.editVideo],
    };
  },
  uploadVideo(): UseMutationOptions<
    unknown,
    unknown,
    {
      formData: FormData;
      config: {
        onUploadProgress: (progressEvent: unknown) => void;
      };
    }
  > {
    return {
      mutationFn: ({ formData, config }) =>
        videoService.uploadVideo({ formData, config }),
      mutationKey: [queryKeys.uploadVideo],
    };
  },
} as const;

export default videoMutations;
