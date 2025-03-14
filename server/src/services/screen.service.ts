import { IContentItem, ISection, ScreenModel } from "../models/screen.model";

export const createScreen = async (name: string) => {
  const screen = await ScreenModel.create({ name });

  return screen;
};

export const addSectionToScreen = async (
  screenId: string,
  section: Pick<ISection, "type" | "title">
) => {
  const existingScreen = await ScreenModel.findById(screenId);

  if (!existingScreen) {
    throw new Error("Screen not found");
  }

  const newOrder = existingScreen.sections.length;

  const screen = await ScreenModel.findByIdAndUpdate(
    screenId,
    { $push: { sections: { ...section, order: newOrder, items: [] } } },
    { new: true }
  );

  return screen;
};

export const addItemToSection = async (
  screenId: string,
  sectionId: string,
  item: Pick<
    IContentItem,
    "title" | "description" | "imageUrl" | "actionUrl" | "order"
  >
) => {
  const screen = await ScreenModel.findById(screenId);

  if (!screen) {
    throw new Error("Screen not found");
  }

  const updatedScreen = await ScreenModel.findOneAndUpdate(
    {
      _id: screenId,
      "sections._id": sectionId,
    },
    {
      $push: {
        "sections.$.items": item,
      },
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedScreen) {
    throw new Error("Screen or section not found");
  }

  return updatedScreen;
};

export const updateScreen = async (screenId: string, sections: any) => {
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

export const getAllScreens = async () => {
  const screens = await ScreenModel.find();

  return screens;
};
