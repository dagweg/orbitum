"use client";

import { Button } from "@/components/ui/button";
import { setIsUploadAttachmentOpen } from "@/lib/redux/slices/attachment/chatAttachmentSlice";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { Paperclip } from "lucide-react";
import { ChangeEvent, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

export function AttachmentButton() {
  const fileRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch<AppDispatch>();
  const { isUploadAttachmentOpen } = useSelector(
    (state: RootState) => state.ChatAttachment
  );

  const handleAttachmentButtonClick = () => {
    fileRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
  };

  return (
    <div>
      <input
        type="file"
        ref={fileRef}
        onChange={(e) => handleFileChange(e)}
        hidden
      />
      <Button variant={"circleGhost"} onClick={handleAttachmentButtonClick}>
        <Paperclip className="" />
      </Button>
      {isUploadAttachmentOpen && (
        <div className="absolute left-0 -top-[218%] h-[220%] w-full bg-white border-b-[1px] border-neutral-300"></div>
      )}
    </div>
  );
}
