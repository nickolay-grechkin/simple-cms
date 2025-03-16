import { deleteSectionSchema, upsertSectionSchema } from "../validation/screen";
import { deleteSection, upsertSection } from "../services/section.service";
import { Response, Request } from "express";

export const upsertSectionController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { success, data } = upsertSectionSchema.safeParse(req.body);

    if (!success) {
      res.status(400).json({ message: "Invalid request body" });
      return;
    }

    const updatedScreen = await upsertSection(data);

    res.status(200).json(updatedScreen);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export const deleteSectionController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { success, data } = deleteSectionSchema.safeParse(req.body);

    if (!success) {
      res.status(400).json({ message: "Invalid request body" });
      return;
    }

    const updatedScreen = await deleteSection(data);

    res.status(200).json(updatedScreen);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};
