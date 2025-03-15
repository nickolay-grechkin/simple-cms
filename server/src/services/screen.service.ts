import { ScreenModel } from "../models/screen.model";
import { SectionSchema } from "../validation";

export const getAllScreens = async () => {
  const screens = await ScreenModel.find();

  return screens;
};

export const updateScreen = async (
  screenId: string,
  sections: SectionSchema[]
) => {
  const updatedScreen = await ScreenModel.findByIdAndUpdate(
    screenId,
    { sections },
    { new: true }
  );

  if (!updatedScreen) {
    throw new Error("Screen not found");
  }

  return updatedScreen;
};
