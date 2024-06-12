import { Loader } from "lucide-react";

function Spinner({ className }: { className?: string }) {
  return <Loader className={`animate-spin ${className}`} size={17} />;
}

export default Spinner;
