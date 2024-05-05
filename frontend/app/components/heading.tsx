import { cn } from "@/lib/utils";
import { TSize } from "../types";

function Heading({
  children,
  size = "medium",
}: {
  children: React.ReactNode;
  size?: TSize;
}) {
  return (
    <div
      className={cn(
        size == "small"
          ? "text-xl"
          : size == "medium"
          ? "text-2xl"
          : size == "large"
          ? "text-4xl"
          : "text-xl",
        "font-semibold"
      )}
    >
      {children}
    </div>
  );
}

export default Heading;
