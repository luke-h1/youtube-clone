import fs from 'fs';

export function getPath({
  videoId,
  extension,
}: {
  videoId: string;
  extension: string;
}) {
  if (!fs.existsSync(`${process.cwd()}/videos`)) {
    fs.mkdirSync(`${process.cwd()}/videos`);
  }

  return `${process.cwd()}/videos/${videoId}.${extension}`;
}
