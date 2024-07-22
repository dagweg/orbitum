import { arrayBuffertoBase64 } from "@/util/file";
import { Dispatch, SetStateAction, useCallback, useRef, useState } from "react";
import { MicHandlerReturn, TAudio } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { useChatSocket } from "./useChatSocket";
import {
  setAudio,
  setIsRecording,
} from "@/lib/redux/slices/audio/chatAudioSlice";
import useSocket from "./useSocket";
import getSocket from "@/lib/socket";

const socket = getSocket();

export function useAudio() {
  // For Audio recording
  const { audio, isRecording } = useSelector(
    (state: RootState) => state.ChatAudio
  );
  const dispatch = useDispatch<AppDispatch>();

  const audioRef = useRef<TAudio>();
  const mediaRecorderRef = useRef<MediaRecorder>();
  const audioChunksRef = useRef<Blob[]>([]);

  const chatArea = useSelector((state: RootState) => state.ChatArea);
  const chatAudio = useSelector((state: RootState) => state.ChatAudio);

  const { refreshChat } = useChatSocket();

  const handleMicRecord = useCallback((): MicHandlerReturn => {
    function start() {
      audioChunksRef.current = [];
      dispatch(setAudio(undefined));
      dispatch(setIsRecording(true));

      // The following will record from device mic
      (async function record() {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        mediaRecorderRef.current = new MediaRecorder(stream);

        mediaRecorderRef.current.ondataavailable = (event) => {
          audioChunksRef.current.push(event.data);
        };

        mediaRecorderRef.current.onstop = async () => {
          const audioBlob = new Blob(audioChunksRef.current, {
            type: "audio/wav",
          });
          const audioUrl = URL.createObjectURL(audioBlob);
          const arrayBuffer = await audioBlob.arrayBuffer();

          const newAudio = {
            url: audioUrl,
            base64: arrayBuffertoBase64(arrayBuffer),
            type: audioBlob.type,
            size: audioBlob.size,
          } as TAudio;

          // Update State and Ref of the Audio
          dispatch(setAudio(newAudio));
          audioRef.current = newAudio;

          audioChunksRef.current = [];
        };
        mediaRecorderRef.current.start();
      })();
    }

    function stop() {
      // Stop recording
      dispatch(setIsRecording(false));
      console.log(chatAudio.audio);
      socket.emit("chat:sendMessage", {
        to: chatArea?.currentChat?.recipientId,
        audio: audioRef.current,
      });
      mediaRecorderRef.current?.stop();
      audioRef.current = undefined;
      setAudio(undefined);
    }

    return { start, stop };
  }, [chatArea.currentChat, refreshChat]);

  return {
    handleMicRecord,
  };
}
