import { ProfileLite } from "./user";

export type GraphList = {
  items: ProfileLite[];
  nextCursor?: string;
};
