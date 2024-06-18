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
