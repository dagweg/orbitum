import { arrayBuffertoBase64 } from "@/util/file";
import { Dispatch, SetStateAction, useCallback, useRef, useState } from "react";
import { MicHandlerReturn, TAudio } from "../types";
import socket from "@/lib/socket";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { useChatSocket } from "./useChatSocket";

export function useAudio(
  isRecording: boolean,
  setIsRecording: Dispatch<SetStateAction<boolean>>
) {
  // For Audio recording
  const [audio, setAudio] = useState<TAudio>();
  const audioRef = useRef<TAudio>();
  const mediaRecorderRef = useRef<MediaRecorder>();
  const audioChunksRef = useRef<Blob[]>([]);

  const chatArea = useSelector((state: RootState) => state.ChatArea);

  const { refreshChat } = useChatSocket();

  const handleMicRecord = useCallback((): MicHandlerReturn => {
    function start() {
      if (!isRecording) {
        audioChunksRef.current = [];
        setAudio(undefined);
        setIsRecording(true);
      }

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
          setAudio(newAudio);
          audioRef.current = newAudio;

          audioChunksRef.current = [];
        };
        mediaRecorderRef.current.start();
      })();
    }

    function stop() {
      // Stop recording
      setIsRecording(false);
      mediaRecorderRef.current?.stop();

      const newAudio = audioRef.current;

      console.log(newAudio);

      if (chatArea.currentChat && newAudio) {
        // Add the audio to database
        socket.emit("chat:sendAudio", {
          to: chatArea.currentChat.recipientId,
          audio: newAudio,
        });

        setTimeout(() => refreshChat(), 50);
      }
    }

    return { start, stop };
  }, [isRecording, setIsRecording, chatArea.currentChat, refreshChat]);

  return {
    audio,
    handleMicRecord,
  };
}
