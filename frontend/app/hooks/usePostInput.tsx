import { createPost } from "@/lib/redux/slices/post/postThunks";
import { AppDispatch } from "@/lib/redux/store";
import { useDispatch } from "react-redux";
import { TImage, TVideo } from "../types";
import { arrayBuffertoBase64 } from "@/util/file";
import { Dispatch, RefObject, SetStateAction } from "react";

export function usePostInput(
  triggerRef: RefObject<HTMLButtonElement>,
  content: string,
  images: TImage[],
  videos: TVideo[],
  size: number | undefined,
  loading: boolean,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setImages: Dispatch<SetStateAction<TImage[]>>,
  setSize: Dispatch<SetStateAction<number | undefined>>,
  setVideos: Dispatch<SetStateAction<TVideo[]>>
) {
  const dispatch = useDispatch<AppDispatch>();

  function openDialog() {
    triggerRef.current?.click();
  }

  function handlePost() {
    dispatch(
      createPost({
        content,
        images,
        videos,
      })
    );
  }

  function handleFileChange(fileList: FileList) {
    setSize(Array.from(fileList).length as number);
    setLoading(true);
    if (!fileList || fileList.length === 0) {
      console.error("No files selected");
      return;
    }

    let imgs: TImage[] = [];
    const fileReaderPromise = Array.from(fileList).map((file) => {
      return new Promise<void>((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = (result) => {
          const arrayBuffer = result.target?.result as ArrayBuffer;

          imgs.push({
            name: file.name,
            type: file.type,
            base64: arrayBuffertoBase64(arrayBuffer),
            url: URL.createObjectURL(file),
          });
          resolve();
        };
        fileReader.readAsArrayBuffer(file);
        fileReader.onerror = (error) => reject(error);
      });
    });

    Promise.all(fileReaderPromise)
      .then(() => {
        setImages([...images, ...imgs]);
        console.log(imgs);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log("Error reading files ", error);
      });
  }

  function removeImage(key: number) {
    setImages([...images.filter((image) => image.url !== images[key].url)]);
  }

  return {
    openDialog,
    handlePost,
    handleFileChange,
    removeImage,
  };
}
