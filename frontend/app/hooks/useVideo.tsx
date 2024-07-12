import { useState } from "react";

export function useVideo() {
  // TODO

  const [video, setVideo] = useState();

  return { video, setVideo };
}
