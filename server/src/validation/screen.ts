import { z } from "zod";

export const createScreenSchema = z.object({
  name: z.string().min(1),
});

export const addSectionToScreenSchema = z.object({
  screenId: z.string().min(1),
  section: z.object({
    type: z.enum(["banner", "vertical", "horizontal", "grid"]),
    title: z.string().min(1),
    order: z.number().min(0),
  }),
});

export const addItemToSectionSchema = z.object({
  screenId: z.string().min(1),
  sectionId: z.string().min(1),
  item: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    imageUrl: z.string().min(1),
    actionUrl: z.string().min(1),
    order: z.number().min(0),
  }),
});

export const updateScreenSchema = z.object({
  screenId: z.string().min(1),
  sections: z.array(
    z.object({
      _id: z.string().min(1),
      title: z.string().min(1),
      order: z.number().min(0),
      type: z.enum(["banner", "vertical", "horizontal", "grid"]),
      items: z.array(
        z.object({
          _id: z.string().min(1),
          title: z.string().min(1),
          description: z.string().min(1),
          imageUrl: z.string().min(1),
          actionUrl: z.string().min(1),
          order: z.number().min(0),
        })
      ),
    })
  ),
});
