import { SectionSchema } from "../validation";

import { BlockSchema } from "../validation";

export type DraggableItem =
  | (Omit<SectionSchema, "_id" | "blocks"> & { _id: string })
  | BlockSchema;
