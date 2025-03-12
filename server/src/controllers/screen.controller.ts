import { Request, Response } from "express";
import { ScreenModel } from "../models/screen.model";
import {
  createScreenSchema,
  addSectionToScreenSchema,
  addItemToSectionSchema,
  updateScreenSchema,
} from "../validation/screen";
import {
  addItemToSection,
  addSectionToScreen,
  createScreen,
  getAllScreens,
  updateScreen,
} from "../services/screen.service";

export const getScreenConfigs = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const configs = await ScreenModel.find();
    res.status(200).json(configs);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getScreenConfigById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const config = await ScreenModel.findById(req.params.id);
    if (!config) {
      res.status(404).json({ message: "Configuration not found" });
      return;
    }
    res.status(200).json(config);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const createScreenController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { success, data } = createScreenSchema.safeParse(req.body);

    if (!success) {
      res.status(400).json({ message: "Invalid request body" });
      return;
    }

    const savedConfig = await createScreen(data.name);

    res.status(201).json(savedConfig);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export const addSectionToScreenController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { success, data } = addSectionToScreenSchema.safeParse(req.body);

    if (!success) {
      res.status(400).json({ message: "Invalid request body" });
      return;
    }

    const { screenId, section } = data;

    const updatedScreen = await addSectionToScreen(screenId, section);

    res.status(200).json(updatedScreen);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export const addItemToSectionController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { success, data } = addItemToSectionSchema.safeParse(req.body);

    if (!success) {
      res.status(400).json({ message: "Invalid request body" });
      return;
    }

    const { screenId, sectionId, item } = data;

    const updatedScreen = await addItemToSection(screenId, sectionId, item);

    res.status(200).json(updatedScreen);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export const updateScreenController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { success, data } = updateScreenSchema.safeParse(req.body);

    if (!success) {
      res.status(400).json({ message: "Invalid request body" });
      return;
    }

    const updatedConfig = await updateScreen(data.screenId, data.sections);

    res.status(200).json(updatedConfig);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export const deleteScreenConfig = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const deletedConfig = await ScreenModel.findByIdAndDelete(req.params.id);
    if (!deletedConfig) {
      res.status(404).json({ message: "Configuration not found" });
      return;
    }
    res.status(200).json({ message: "Configuration deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
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
