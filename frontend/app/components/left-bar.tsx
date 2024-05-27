"use client";

import { RootState } from "@/lib/redux/store";
import { useSelector } from "react-redux";

function LeftBar() {
  const { email } = useSelector((state: RootState) => state.User);
  return (
    <div className="p-3 text-xs font-extralight flex flex-col fixed  top-0"></div>
  );
}

export default LeftBar;
