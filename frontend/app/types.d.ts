import { TMessageSchema } from "@/lib/types/schema";

export type TSize = "small" | "medium" | "large";

export type TContactProps = {
  name: string;
  lastMessage: string;
  onClick: (e: MouseEvent<HTMLDivElement>) => void;
};

type TSender = "you" | "default";
type TChatType = "default" | "private" | "group" | "channel";

export type TChatProps = {
  name: string;
  message: string;
  sender?: TSender;
  chatType?: TChatType;
};

export type TAvatarWrapper = {
  src?: string;
  alt?: string;
  name?: string;
  date?: Date | undefined;
  lineClamp?: TLineClamp;
  background?: TBackground;
  className?: string;
  summary?: string;
  fallback?: React.ReactNode;
  noavatar?: boolean;
  size?: TSize;
  sender?: TSender;
  chatType?: TChatType;
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

export type TChatSideBar = {
  enabled: boolean;
  enabledStyle: string;
  disabledStyle: string;
};

export type TUser = {
  firstName: string;
  lastName: string;
  profileUrl: string;
  userName: string;
  email: string;
};

export type TChatArea = {
  enabled: boolean;
  enabledStyle: string;
  disabledStyle: string;
  currentChat:
    | {
        yourId: string;
        recipientId: string;
        recipient: TUser;
        messages: TMessageSchema[];
      }
    | undefined;
};

export type TChatSideBarPerson = {
  _id: string;
  firstName: string;
  lastName: string;
  profileUrl: string;
  recentMessage: { content: string };
};

// Zod Return Type
export type TZodReturn = {
  errors: [
    {
      code: string;
      expected: string;
      message: string;
      path: string[];
      recieved: string;
    }
  ];
};
