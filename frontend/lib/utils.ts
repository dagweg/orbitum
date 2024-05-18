import { TZodErrors } from "@val/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getMappedZodErrors(errors: Object[]) {
  const errz: TZodErrors = {};
  for (const error of errors) {
    const e = error as z.ZodIssue;
    errz[(error as z.ZodIssue).path[0] as string] = e;
  }
  return errz;
}

export function getCookie(cname: string, cookies: string) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(cookies);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
