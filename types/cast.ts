import { ProfileLite } from "./user";

export type Cast = {
  hash: string;
  text: string;
  author: ProfileLite;
  embeds?: { url?: string; image?: string }[];
  replies?: number;
  recasts?: number;
  likes?: number;
  timestamp: string;
};
