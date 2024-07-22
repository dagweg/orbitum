export function base64ToBlob(base64: string, mimeType: string) {
  try {
    const bytes = Buffer.from(base64, "base64");
    const uint8Array = new Uint8Array(bytes);

    return new Blob([uint8Array], { type: mimeType });
  } catch (error) {
    console.log((error as Error).message);
    return new Blob();
  }
}

export function createUrl(base64: string, type: string) {
  try {
    const blob = base64ToBlob(base64, type);
    if (!blob) throw new Error("Blob cannot be created");
    return URL.createObjectURL(blob);
  } catch (error) {
    console.log((error as Error).message);
  }
}

export function arrayBuffertoBase64(arrayBuffer: ArrayBuffer) {
  let uint8array = new Uint8Array(arrayBuffer);
  let binary = "";
  const binaryLength = uint8array.length;
  for (let i = 0; i < binaryLength; i++) {
    binary += String.fromCharCode(uint8array[i]);
  }
  return btoa(binary);
}

export function identifyMultimediaFileType(
  fileType: string
): "Photo" | "Video" | "Audio" | "Unknown" {
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
