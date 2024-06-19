import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";
import { TZodErrors } from "./types/types";

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

export function contains(str: string, arr: string[]) {
  return arr.some((el) => str.includes(el));
}

export function initials(firstname: string, lastname: string) {
  return firstname[0] + lastname[0];
}

// returns the date as HH:MM AM/PM
export function getTime2(date: Date) {
  let dateTimeSplit = date.toLocaleTimeString().split(":");
  return Array.prototype
    .concat(dateTimeSplit.slice(0, 2).join(":"), dateTimeSplit[2].split(" ")[1])
    .join(" ");
}
