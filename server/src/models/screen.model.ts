import mongoose, { Schema, Document } from "mongoose";
import { SectionType } from "../enums";

export interface IBlock {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  videoUrl: string;
}

export interface ISection {
  _id: string;
  type: SectionType;
  title: string;
  blocks: IBlock[];
}

export interface IScreen {
  _id: string;
  name: string;
  sections: ISection[];
  createdAt: Date;
  updatedAt: Date;
}

const BlockSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  imageUrl: { type: String },
  videoUrl: { type: String },
});

const SectionSchema: Schema = new Schema({
  type: {
    type: String,
    required: true,
    enum: Object.values(SectionType),
  },
  title: { type: String },
  blocks: [BlockSchema],
});

const ScreenSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    sections: [SectionSchema],
  },
  { timestamps: true, versionKey: false }
);

ScreenSchema.index({ name: 1 }, { unique: true });

export const ScreenModel = mongoose.model<IScreen>("screens", ScreenSchema);
