import { TChatProps } from "../types";
import AvatarWrapper from "./avatar-wrapper";

function ChatMessage({ name, message }: TChatProps) {
  return (
    <div className="p-2">
      <AvatarWrapper
        name={name}
        lineClamp="line-clamp-none"
        summary={message}
        className="p-4 !bg-neutral-200 rounded-none rounded-r-3xl rounded-bl-lg"
      />
    </div>
  );
}

export default ChatMessage;
