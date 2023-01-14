import { Video } from '@prisma/client';
import { prisma } from '../../db/prisma';

export function createVideo({ owner }: { owner: string }) {
  return prisma.video.create({
    data: {
      owner: {
        connect: {
          id: owner,
        },
      },
      description: '',
      title: '',
      extension: 'mp4',
    },
  });
}

export function findVideo(videoId: string) {
  return prisma.video.findUnique({
    where: {
      id: videoId,
    },
  });
}

export function findVideosByOwner(ownerId: string) {
  return prisma.video.findMany({
    where: {
      owner: {
        id: ownerId,
      },
    },
  });
}

export function findVideos() {
  return prisma.video.findMany();
}

export function updateVideoExtension(videoId: string, extension: string) {
  return prisma.video.update({
    where: {
      id: videoId,
    },
    data: {
      extension,
    },
  });
}

export function updateVideo(
  videoId: string,
  data: Partial<Omit<Video, 'createdAt' | 'updatedAt' | 'id'>>,
) {
  return prisma.video.update({
    where: {
      id: videoId,
    },
    data,
  });
}
