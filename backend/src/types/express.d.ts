import { DefaultEventsMap } from "socket.io/dist/typed-events";

declare global {
  namespace Express {
    interface Request {
      user: any;
    }
  }

  interface Socket extends DefaultEventsMap {
    user: any;
  }
}

export {};
