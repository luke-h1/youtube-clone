export function getPath({
  videoId,
  extension,
}: {
  videoId: string;
  extension: string;
}) {
  return `${process.cwd()}/videos/${videoId}.${extension}`;
}
