import { Request, Response } from "express";

export const anaylzeController = (req: Request, res: Response) => {
  res.json({ message: "Hello from example route!, yes am here" });
};
