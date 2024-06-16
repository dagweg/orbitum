export function base64ToBlob(base64: string, mimeType: string) {
  const bytes = atob(base64);

  const bytesNum = new Array(bytes.length);

  for (let i = 0; i < bytes.length; i++) {
    bytesNum[i] = bytes.charCodeAt(i);
  }

  const uint8Array = new Uint8Array(bytesNum);

  return new Blob([uint8Array], { type: mimeType });
}
