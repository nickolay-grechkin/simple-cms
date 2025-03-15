import mongoose from "mongoose";
import { ScreenModel, IScreen } from "../models/screen.model";
import { connectDB } from "../config/db.config";

const screenSeedData: Partial<IScreen>[] = [
  {
    name: "Home Screen",
    sections: [
      {
        _id: new mongoose.Types.ObjectId().toString(),
        type: "banner",
        title: "Featured Content",
        items: [
          {
            _id: new mongoose.Types.ObjectId().toString(),
            title: "Welcome to our App",
            description: "Discover amazing content and features",
            imageUrl: "https://example.com/banner.jpg",
            videoUrl: "/featured",
          },
        ],
      },
      {
        _id: new mongoose.Types.ObjectId().toString(),
        type: "horizontal",
        title: "Popular Items",
        items: [
          {
            _id: new mongoose.Types.ObjectId().toString(),
            title: "Item 1",
            imageUrl: "https://example.com/item1.jpg",
            videoUrl: "/item1",
          },
          {
            _id: new mongoose.Types.ObjectId().toString(),
            title: "Item 2",
            imageUrl: "https://example.com/item2.jpg",
            videoUrl: "/item2",
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
