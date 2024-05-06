import { TContactProps } from "../types";
import AvatarWrapper from "./avatar-wrapper";

function SelectContact({ name, lastMessage }: TContactProps) {
  return (
    <div className="ring-[1px] ring-neutral-200 bg-neutral-50 hover:bg-neutral-100 cursor-pointer py-3 px-2 rounded-lg">
      <AvatarWrapper name={name} summary={lastMessage} />
    </div>
  );
}

export default SelectContact;
