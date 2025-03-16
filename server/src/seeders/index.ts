import mongoose from "mongoose";
import { ScreenModel, IScreen } from "../models/screen.model";
import { connectDB } from "../config/db.config";
import { SectionType } from "../enums/section";

const screenSeedData: Partial<IScreen>[] = [
  {
    name: "Головний екран",
    sections: [
      {
        _id: new mongoose.Types.ObjectId().toString(),
        type: SectionType.BANNER,
        title: "Баннер",
        blocks: [
          {
            _id: new mongoose.Types.ObjectId().toString(),
            title: "Block 1",
            description: "Description 1",
            imageUrl:
              "https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg",
            videoUrl: "/block1",
          },
          {
            _id: new mongoose.Types.ObjectId().toString(),
            title: "Block 2",
            description: "Description 2",
            imageUrl:
              "https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg",
            videoUrl: "/block2",
          },
          {
            _id: new mongoose.Types.ObjectId().toString(),
            title: "Block 3",
            description: "Description 3",
            imageUrl:
              "https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg",
            videoUrl: "/block3",
          },
          {
            _id: new mongoose.Types.ObjectId().toString(),
            title: "Block 4",
            description: "Description 4",
            imageUrl:
              "https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg",
            videoUrl: "/block4",
          },
        ],
      },
      {
        _id: new mongoose.Types.ObjectId().toString(),
        type: SectionType.HORIZONTAL,
        title: "Найбільш популярне",
        blocks: [
          {
            _id: new mongoose.Types.ObjectId().toString(),
            title: "Block 1",
            description: "Description 1",
            imageUrl:
              "https://images.pexels.com/photos/416160/pexels-photo-416160.jpeg",
            videoUrl: "/block1",
          },
          {
            _id: new mongoose.Types.ObjectId().toString(),
            title: "Block 2",
            description: "Description 2",
            imageUrl:
              "https://images.pexels.com/photos/416160/pexels-photo-416160.jpeg",
            videoUrl: "/block2",
          },
          {
            _id: new mongoose.Types.ObjectId().toString(),
            title: "Block 3",
            description: "Description 3",
            imageUrl:
              "https://images.pexels.com/photos/416160/pexels-photo-416160.jpeg",
            videoUrl: "/block3",
          },
          {
            _id: new mongoose.Types.ObjectId().toString(),
            title: "Block 4",
            description: "Description 4",
            imageUrl:
              "https://images.pexels.com/photos/416160/pexels-photo-416160.jpeg",
            videoUrl: "/block4",
          },
          {
            _id: new mongoose.Types.ObjectId().toString(),
            title: "Block 5",
            description: "Description 5",
            imageUrl:
              "https://images.pexels.com/photos/416160/pexels-photo-416160.jpeg",
            videoUrl: "/block5",
          },
        ],
      },
      {
        _id: new mongoose.Types.ObjectId().toString(),
        type: SectionType.HORIZONTAL,
        title: "Найкращий вибір",
        blocks: [
          {
            _id: new mongoose.Types.ObjectId().toString(),
            title: "Block 1",
            description: "Description 1",
            imageUrl:
              "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg",
            videoUrl: "/block1",
          },
          {
            _id: new mongoose.Types.ObjectId().toString(),
            title: "Block 2",
            description: "Description 2",
            imageUrl:
              "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg",
            videoUrl: "/block2",
          },
          {
            _id: new mongoose.Types.ObjectId().toString(),
            title: "Block 3",
            description: "Description 3",
            imageUrl:
              "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg",
            videoUrl: "/block3",
          },
          {
            _id: new mongoose.Types.ObjectId().toString(),
            title: "Block 4",
            description: "Description 4",
            imageUrl:
              "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg",
            videoUrl: "/block4",
          },
          {
            _id: new mongoose.Types.ObjectId().toString(),
            title: "Block 5",
            description: "Description 5",
            imageUrl:
              "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg",
            videoUrl: "/block5",
          },
        ],
      },
    ],
  },
];

const seedDatabase = async (): Promise<void> => {
  try {
    await connectDB();

    await ScreenModel.deleteMany({});
    console.log("Existing screen data cleared");

    const result = await ScreenModel.insertMany(screenSeedData);
    console.log(`Database seeded with ${result.length} screens`);

    await mongoose.disconnect();
    console.log("Database connection closed");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
