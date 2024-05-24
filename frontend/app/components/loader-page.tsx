import { Loader } from "lucide-react";

export default function LoaderPage({
  className,
  description,
}: {
  className?: string;
  description?: string;
}) {
  return (
    <div
      className={`flex flex-col gap-3 justify-center items-center w-full h-full ${className}`}
    >
      <div className="flex flex-col items-center gap-3">
        <Loader className="animate-spin " />
        {description}
      </div>
    </div>
  );
}
