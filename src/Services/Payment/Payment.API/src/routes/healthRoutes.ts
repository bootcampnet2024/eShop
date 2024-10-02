import express, { Request, Response } from "express";

export const healthRouter = express.Router();

healthRouter.get("/", (req: Request, res: Response) => {
  return res.status(200).json({ message: "Healthy" });
});
