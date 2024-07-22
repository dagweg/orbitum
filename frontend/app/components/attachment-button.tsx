"use client";

import { Button } from "@/components/ui/button";
import {
  addAttachment,
  removeAttachment,
  setIsUploadAttachmentOpen,
} from "@/lib/redux/slices/attachment/chatAttachmentSlice";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { AudioLines, Delete, File, Paperclip, Video, X } from "lucide-react";
import { ChangeEvent, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TFile } from "../types";
import {
  arrayBuffertoBase64,
  createUrl,
  identifyMultimediaFileType,
} from "@/util/file";
import { IoIosPhotos } from "react-icons/io";
import Image from "next/image";

export function AttachmentButton() {
  const fileRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch<AppDispatch>();

  const { isUploadAttachmentOpen, attachments } = useSelector(
    (state: RootState) => state.ChatAttachment
  );

  const handleAttachmentButtonClick = () => {
    fileRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.files);
    const fileList: FileList | null = e.target.files;
    if (!fileList) return;

    for (let i = 0; i < fileList.length; i++) {
      const fileReader = new FileReader();
      fileReader.onload = (result) => {
        const arrayBuffer = result.target?.result as ArrayBuffer;
        const b64 = arrayBuffertoBase64(arrayBuffer);
        dispatch(
          addAttachment({
            name: fileList[i].name,
            type: fileList[i].type,
            base64: b64,
            url:
              identifyMultimediaFileType(fileList[i].type) === "Photo"
                ? createUrl(b64, fileList[i].type)
                : undefined,
          })
        );
      };

      fileReader.readAsArrayBuffer(fileList[i]);
    }
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
      {attachments.length > 0 && (
        <>
          <div className="p-2 absolute left-0 -top-[218%] h-[220%] w-full bg-white  border-neutral-300 overflow-x-scroll no-scrollbar overflow-y-hidden flex gap-2">
            {attachments.map((file, index) => {
              let icon;
              switch (identifyMultimediaFileType(file.type)) {
                case "Audio":
                  icon = <AudioLines size={50} />;
                  break;
                case "Video":
                  icon = <Video size={50} />;
                  break;
                case "Photo":
                  icon = (
                    <Image
                      src={file.url as string}
                      alt={file.name}
                      width={50}
                      height={50}
                      className="w-full max-h-full max-w-full object-contain"
                    />
                  );
                  break;
                default:
                  icon = <File size={50} />;
              }
              return (
                <div className="relative group/file h-full bg-neutral-100 px-3 rounded-md flex flex-col items-center">
                  <Button
                    variant={"circleGhost"}
                    onClick={() => dispatch(removeAttachment(index))}
                    className="absolute -top-1 -right-1 group-hover/file:scale-100 scale-0 duration-100 ease-in-out p-1 bg-white hover:bg-red-600  hover:text-white !w-6 !h-6"
                  >
                    <X size={15} />
                  </Button>
                  <span className="w-[100px] max-h-full flex items-center justify-center h-[80%]">
                    {icon}
                  </span>
                  <span className="absolute bottom-0 bg-white w-full text-center font-workSans text-xs">
                    {file.name.slice(0, 10)}
                  </span>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
