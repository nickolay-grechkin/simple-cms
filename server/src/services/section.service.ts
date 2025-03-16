import { ScreenModel } from "../models/screen.model";
import { DeleteSectionSchema, UpsertSectionSchema } from "../validation";

export const upsertSection = async ({
  screenId,
  section,
}: UpsertSectionSchema) => {
  let screen;

  if (section._id) {
    screen = await ScreenModel.findOneAndUpdate(
      {
        _id: screenId,
        "sections._id": section._id,
      },
      {
        $set: {
          "sections.$": {
            ...section,
          },
        },
      },
      { new: true }
    );
  } else {
    screen = await ScreenModel.findByIdAndUpdate(
      screenId,
      {
        $push: {
          sections: {
            title: section.title,
            type: section.type,
            blocks: [],
          },
        },
      },
      { new: true }
    );
  }

  return screen;
};

export const deleteSection = async ({
  screenId,
  sectionId,
}: DeleteSectionSchema) => {
  const updatedScreen = await ScreenModel.findByIdAndUpdate(
    screenId,
    { $pull: { sections: { _id: sectionId } } },
    { new: true }
  );

  if (!updatedScreen) {
    throw new Error("Screen not found");
  }

  return updatedScreen;
};
