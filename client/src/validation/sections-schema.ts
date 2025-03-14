import { z } from "zod";
import { SectionType } from "../enums/section";

export const sectionsSchema = z.object({
  sections: z.array(
    z.object({
      _id: z.string(),
      title: z.string(),
      type: z.enum([
        SectionType.HORIZONTAL,
        SectionType.VERTICAL,
        SectionType.BANNER,
        SectionType.GRID,
      ]),
      order: z.number(),
      items: z.array(
        z.object({
          _id: z.string(),
          title: z.string(),
          description: z.string(),
          imageUrl: z.string(),
          actionUrl: z.string(),
          order: z.number(),
        })
      ),
    })
  ),
});

export type SectionsSchemaType = z.infer<typeof sectionsSchema>;
