"use client";

import ExpandableButton, {
  ExpandableButtonContent,
  ExpandableButtonInput,
  ExpandableButtonItem,
  ExpandableButtonTitle,
  ExpandableButtonTrigger,
} from "@/app/components/expandable-button";
import Heading from "@/app/components/heading";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { RootState } from "@/lib/redux/store";
import { base64ToBlob } from "@/util/file";

import { Camera, ChevronDown, ChevronRight } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import { useSelector } from "react-redux";

function Settings() {
  return (
    <div className="max-w-prose mx-auto bg-white h-screen px-4 py-2">
      <Heading>Settings</Heading>
      <div className="h-full w-full flex flex-col gap-1 mt-5">
        <ProfileSetting />
        <ExpandableButton>
          <ExpandableButtonTrigger>Display</ExpandableButtonTrigger>
          <ExpandableButtonContent>
            <ExpandableButtonItem>
              <ExpandableButtonTitle>Primary-Font</ExpandableButtonTitle>
              <ExpandableButtonInput>
                <select defaultValue={0}>
                  <option>Open Sans</option>
                  <option>Lato</option>
                  <option>System Default</option>
                </select>
              </ExpandableButtonInput>
            </ExpandableButtonItem>
            <ExpandableButtonItem>
              <ExpandableButtonTitle>Theme</ExpandableButtonTitle>
              <ExpandableButtonInput>
                <select defaultValue={0}>
                  <option>Light</option>
                  <option>Dark</option>
                </select>
              </ExpandableButtonInput>
            </ExpandableButtonItem>
          </ExpandableButtonContent>
        </ExpandableButton>
        <ExpandableButton>
          <ExpandableButtonTrigger>Chat</ExpandableButtonTrigger>
          <ExpandableButtonContent>
            <ExpandableButtonItem>
              <ExpandableButtonTitle>Online Indicator</ExpandableButtonTitle>
              <ExpandableButtonInput>
                <select defaultValue={0}>
                  <option>On</option>
                  <option>Off</option>
                </select>
              </ExpandableButtonInput>
            </ExpandableButtonItem>
            <ExpandableButtonItem>
              <ExpandableButtonTitle>Typing Indicator</ExpandableButtonTitle>
              <ExpandableButtonInput>
                <select defaultValue={0}>
                  <option>On</option>
                  <option>Off</option>
                </select>
              </ExpandableButtonInput>
            </ExpandableButtonItem>
          </ExpandableButtonContent>
        </ExpandableButton>
      </div>
    </div>
  );
}

function ProfileSetting() {
  const ALLOWED_IMAGES = ".jpg, .jpeg, .png, .gif";
  const user = useSelector((state: RootState) => state.User);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [image, setImage] = useState<{
    base64: string;
    type: string;
    name: string;
    url: string;
  }>();

  function chooseImageFile() {
    fileInputRef.current?.click();
  }

  function handleFiles(e: ChangeEvent<HTMLInputElement>) {
    if (e.target && e.target.files) {
      const file = e.target.files[0];

      const fileReader = new FileReader();
      fileReader.onload = (result) => {
        const abuf = result.target?.result as ArrayBuffer;
        const base64 = Buffer.from(abuf).toString("base64");
        setImage({
          name: file.name,
          type: file.type,
          base64,
          url: URL.createObjectURL(base64ToBlob(base64, file.type)),
        });
      };
      fileReader.readAsArrayBuffer(file);
    }
  }

  return (
    <>
      <ExpandableButton>
        <ExpandableButtonTrigger>Profile</ExpandableButtonTrigger>
        <ExpandableButtonContent>
          <ExpandableButtonItem>
            <ExpandableButtonTitle>Picture</ExpandableButtonTitle>
            <ExpandableButtonInput>
              <Avatar
                className="relative ring-2 ring-neutral-300 group/avatar [&>*]:cursor-pointer"
                onClick={chooseImageFile}
              >
                <AvatarImage src={user.profileUrl ?? image?.url}></AvatarImage>
                <AvatarFallback>
                  {user.firstName[0] + user.lastName[0]}
                </AvatarFallback>
                <div className="absolute bottom-[-100%] group-hover/avatar:bottom-0 duration-200 ease-out  w-full flex justify-center bg-white">
                  <Camera size={15} />
                </div>
              </Avatar>
              <input
                type="file"
                className="sr-only"
                ref={fileInputRef}
                accept={ALLOWED_IMAGES}
                onChange={(e) => handleFiles(e)}
              />
            </ExpandableButtonInput>
          </ExpandableButtonItem>
        </ExpandableButtonContent>
      </ExpandableButton>
      <Dialog>
        <DialogTrigger>
          <Button>Trigger</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Edit Profile</DialogTitle>
          <Avatar className="relative shadow-md group/avatar [&>*]:cursor-pointer w-[130px] h-[130px] ">
            <AvatarImage src={user.profileUrl}></AvatarImage>
            <AvatarFallback>
              {user.firstName[0] + user.lastName[0]}
            </AvatarFallback>
            <div className="absolute bottom-[-100%] group-hover/avatar:bottom-0 duration-200 ease-out  w-full flex justify-center bg-white">
              <Camera size={15} />
            </div>
          </Avatar>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Settings;
