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
