import busboy from 'busboy';
import { Request, Response } from 'express';
import fs from 'fs';
import { prisma } from '../../db/prisma';
import { UpdateVideoParams, UpdateVideoSchema } from './video.schema';
import {
  createVideo,
  findVideo,
  findVideos,
  updateVideo,
  updateVideoExtension,
} from './video.service';
import { getPath } from './video.utils';

const ALLOWED_MIME_TYPES = ['video/mp4'];
const CHUNK_SIZE_IN_BYTES = 1000000; // 1MB

export async function uploadVideoHandler(req: Request, res: Response) {
  const bb = busboy({
    headers: req.headers,
  });

  const { user } = res.locals;

  // create basic video object first and then allow the user to
  // update the video by setting a title & description
  const video = await createVideo({
    owner: user.id,
  });

  bb.on('file', async (_, file, info) => {
    const { mimeType } = info;

    if (!ALLOWED_MIME_TYPES.includes(mimeType)) {
      return res.status(400).json({
        error: 'Invalid file type',
      });
    }

    const extension = mimeType.split('/')[1];

    const filePath = getPath({
      videoId: video.id,
      extension,
    });

    await updateVideoExtension(video.id, extension);

    const stream = fs.createWriteStream(filePath);

    file.pipe(stream);
  });

  // when the file is done being written, send a response

  bb.on('close', () => {
    // write the video file to the response
    res.writeHead(201, {
      Connection: 'close',
      'Content-Type': 'application/json',
    });
    res.write(JSON.stringify(video));
    res.end();
  });

  return req.pipe(bb);
}

export async function updateVideoHandler(
  req: Request<UpdateVideoParams, {}, UpdateVideoSchema>,
  res: Response,
) {
  const { videoId } = req.params;
  const { description, published, title } = req.body;

  const { id: userId } = res.locals.user;

  const video = await findVideo(videoId);

  if (!video) {
    return res.status(404).json({
      error: 'Video not found',
    });
  }

  if (video.ownerId !== userId) {
    return res.status(403).json({
      message: 'You do not have permission to update this video',
    });
  }

  const updatedVideo = await updateVideo(videoId, {
    description,
    published,
    title,
  });

  return res.status(200).json({
    video: updatedVideo,
  });
}

export async function findVideosHandler(_req: Request, res: Response) {
  const videos = await findVideos();

  return res.status(200).json({
    videos,
  });
}
