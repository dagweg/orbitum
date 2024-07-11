export function identifyMultimediaFileType(fileType: string): string {
  const photoTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/bmp",
    "image/webp",
    "image/svg+xml",
  ];
  const videoTypes = [
    "video/mp4",
    "video/avi",
    "video/mpeg",
    "video/webm",
    "video/quicktime",
    "video/x-msvideo",
  ];
  const audioTypes = [
    "audio/mpeg",
    "audio/wav",
    "audio/ogg",
    "audio/flac",
    "audio/aac",
    "audio/mp3",
  ];

  if (photoTypes.includes(fileType)) {
    return "Photo";
  } else if (videoTypes.includes(fileType)) {
    return "Video";
  } else if (audioTypes.includes(fileType)) {
    return "Audio";
  } else {
    return "Unknown";
  }
}
