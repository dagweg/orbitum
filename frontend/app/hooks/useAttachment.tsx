import { useState } from "react";

export function useAttachment() {
  const [attachment, setAttachment] = useState();
  return { attachment, setAttachment };
}
