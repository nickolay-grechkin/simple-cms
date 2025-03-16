import { z } from "zod";
import { SectionType } from "../enums/section";

const blockSchema = z.object({
  _id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  imageUrl: z.string().min(1),
  videoUrl: z.string().min(1),
});

export const sectionSchema = z.object({
  _id: z.string().nullable(),
  title: z.string(),
  type: z.nativeEnum(SectionType),
  blocks: z.array(blockSchema),
});

export const sectionsSchema = z.object({
  sections: z.array(sectionSchema),
});

export type BlockSchema = z.infer<typeof blockSchema>;
export type SectionSchema = z.infer<typeof sectionSchema>;
export type SectionsSchemaType = z.infer<typeof sectionsSchema>;
