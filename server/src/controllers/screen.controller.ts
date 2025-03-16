import { Request, Response } from "express";
import { updateScreenSchema } from "../validation";
import { getAllScreens, updateScreen } from "../services/screen.service";

export const updateScreenController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { success, data, error } = updateScreenSchema.safeParse(req.body);

    if (!success) {
      res.status(400).json({ message: error.message });
      return;
    }

    const updatedConfig = await updateScreen(data.screenId, data.sections);

    res.status(200).json(updatedConfig);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export const getAllScreensController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const screens = await getAllScreens();
    res.status(200).json(screens);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
