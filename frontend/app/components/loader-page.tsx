import { Loader } from "lucide-react";

export default function LoaderPage() {
  return (
    <div className="flex flex-col gap-3 justify-center items-center w-full h-full">
      <div className="flex flex-col items-center gap-3">
        <Loader className="animate-spin " />
      </div>
    </div>
  );
}
