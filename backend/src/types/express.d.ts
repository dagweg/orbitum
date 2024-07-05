import { DefaultEventsMap } from "socket.io/dist/typed-events";

declare global {
  namespace Express {
    interface Request {
      user: { email: string; userId: string };
    }
  }

  interface Socket extends DefaultEventsMap {
    user: {
      email: string;
      userId: string;
    };
  }
}

export {};
