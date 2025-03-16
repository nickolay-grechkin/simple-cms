import { SectionSchema } from "../validation";

export type Screen = {
  _id: string;
  name: string;
  sections: SectionSchema[];
};
