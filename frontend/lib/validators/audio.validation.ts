import { z } from "zod";
import { TUserSchema } from "@/lib/types/schema";

export const AudioSchema = z.object({
  type: z.string(),
  name: z.string(),
  base64: z.string(),
});
