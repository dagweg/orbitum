import { Response, Request } from "express";
export function validateSession(req: Request, res: Response) {
  try {
  } catch (error) {
    return res.send(500).json({ message: (error as Error).message });
  }
}
