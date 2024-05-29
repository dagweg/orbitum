import { RefObject, useEffect } from "react";

function useClickOutsideObserver(
  ref: RefObject<Element>,
  callback: () => void
) {
  useEffect(() => {
    const handleClick = (e: Event) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callback();
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [ref, callback]);
}

export default useClickOutsideObserver;
