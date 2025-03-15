import { z } from "zod";
import { SectionType } from "../enums";

export const createScreenSchema = z.object({
  name: z.string().min(1),
});

const blockSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  imageUrl: z.string().min(1),
  videoUrl: z.string().min(1),
});

const sectionSchema = z.object({
  _id: z.string().nullable(),
  title: z.string().min(1),
  type: z.nativeEnum(SectionType),
  blocks: z.array(blockSchema),
});

export const upsertSectionSchema = z.object({
  screenId: z.string().min(1),
  section: sectionSchema,
});

export const updateScreenSchema = z.object({
  screenId: z.string().min(1),
  sections: z.array(sectionSchema),
});

export const deleteSectionSchema = z.object({
  screenId: z.string().min(1),
  sectionId: z.string().min(1),
});

export type SectionSchema = z.infer<typeof sectionSchema>;
export type BlockSchema = z.infer<typeof blockSchema>;

export type CreateScreenSchema = z.infer<typeof createScreenSchema>;
export type UpsertSectionSchema = z.infer<typeof upsertSectionSchema>;
export type UpdateScreenSchema = z.infer<typeof updateScreenSchema>;
export type DeleteSectionSchema = z.infer<typeof deleteSectionSchema>;
