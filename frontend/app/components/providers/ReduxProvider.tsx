"use client";

import { getAllPosts } from "@/lib/redux/slices/post/postThunks";
import { AppDispatch, store } from "@/lib/redux/store";
import { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";

function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}

export default ReduxProvider;
