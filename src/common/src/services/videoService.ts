import { Video } from '@common/types/video';
import { AxiosProgressEvent } from 'axios';
import youtubeApi from './clients/youtubeApi';

export interface VideoEditPayload {
  payload: Omit<
    Video,
    | 'createdAt'
    | 'updatedAt'
    | 'id'
    | 'publishedAt'
    | 'extension'
    | 'owner'
    | 'ownerId'
  >;
}

const videoService = {
  async uploadVideo({
    formData,
    config,
  }: {
    formData: FormData;
    config: { onUploadProgress: (progressEvent: AxiosProgressEvent) => void };
  }) {
    const res = await youtubeApi.post('/api/videos', formData, {
      withCredentials: true,
      ...config,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return res.data;
  },

  async editVideo({
    videoId,
    ...payload
  }: { videoId: string } & VideoEditPayload) {
    const res = await youtubeApi.patch(`/api/videos/${videoId}`, payload, {
      withCredentials: true,
    });

    return res.data;
  },

  async getVideos() {
    const res = await youtubeApi.get('/api/videos');
    return res.data;
  },

  async getVideo(videoId: string) {
    const res = await youtubeApi.get(`/api/videos/${videoId}`);
    return res.data;
  },
};

export default videoService;
