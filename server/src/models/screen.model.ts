import mongoose, { Schema, Document } from "mongoose";

export interface IContentItem extends Document {
  _id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  actionUrl?: string;
  order: number;
}

export interface ISection extends Document {
  _id: string;
  type: "banner" | "vertical" | "horizontal" | "grid";
  title?: string;
  items: IContentItem[];
  order: number;
}

export interface IScreen extends Document {
  _id: string;
  name: string;
  sections: ISection[];
  createdAt: Date;
  updatedAt: Date;
}

const ContentItemSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  imageUrl: { type: String },
  actionUrl: { type: String },
  order: { type: Number, required: true },
});

const SectionSchema: Schema = new Schema({
  type: {
    type: String,
    required: true,
    enum: ["banner", "vertical", "horizontal", "grid"],
  },
  title: { type: String },
  items: [ContentItemSchema],
  order: { type: Number, required: true },
});

const ScreenSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    sections: [SectionSchema],
  },
  { timestamps: true, versionKey: false }
);

export const ScreenModel = mongoose.model<IScreen>("screens", ScreenSchema);
