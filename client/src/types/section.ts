import { SectionType } from "../enums/section";
import { SectionItem } from "./section-item";

export type Section = {
  _id: string;
  type: SectionType;
  title: string;
  order: number;
  items: SectionItem[];
};
