import { useDispatch } from "react-redux";
import useSocket from "./useSocket";
import { AppDispatch } from "@/lib/redux/store";
import { addNotification } from "@/lib/redux/slices/notification/notificationSlice";

export function useNotification() {
  const dispatch = useDispatch<AppDispatch>();
  useSocket("receiveNotification", (data) => {
    dispatch(addNotification(data.notification));
  });
}
