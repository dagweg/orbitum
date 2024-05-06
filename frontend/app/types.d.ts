export type TSize = "small" | "medium" | "large";

export type TContactProps = {
  name: string;
  lastMessage: string;
};

export type TChatProps = {
  name: string;
  message: string;
};

export type TLineClamp =
  | "line-clamp-1"
  | "line-clamp-2"
  | "line-clamp-3"
  | "line-clamp-4"
  | "line-clamp-5"
  | "line-clamp-6"
  | "line-clamp-7"
  | "line-clamp-8"
  | "line-clamp-9"
  | "line-clamp-10"
  | "line-clamp-none";

export type TBackground =
  | "bg-transparent"
  | "bg-white"
  | "bg-neutral-200"
  | "bg-neutral-100"
  | "bg-neutral-300";
