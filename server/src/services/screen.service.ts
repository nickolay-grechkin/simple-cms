import { IContentItem, ISection, ScreenModel } from "../models/screen.model";

export const createScreen = async (name: string) => {
  const screen = await ScreenModel.create({ name });

  return screen;
};

export const addSectionToScreen = async (
  screenId: string,
  section: Pick<ISection, "type" | "title" | "order">
) => {
  const screen = await ScreenModel.findByIdAndUpdate(
    screenId,
    { $push: { sections: section } },
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
      new: true, // Повертає оновлений документ
      runValidators: true, // Запускає валідатори схеми
    }
  );

  if (!updatedScreen) {
    throw new Error("Screen or section not found");
  }

  return updatedScreen;
};
