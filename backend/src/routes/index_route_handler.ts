import { Request, Response } from "express";

export default function index_route_handler(req: Request, res: Response) {
  res.send("Hello, World!");
}
