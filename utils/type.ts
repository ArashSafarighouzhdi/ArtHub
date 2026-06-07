export type ArtObject = {
  id: number;
  title: string;
  dated: string;
  culture: string;
  medium: string;
  primaryimageurl: string | null;
  period: string;
  people?: {
    culture: string;
    name: string;
    role: string;
  }[];
};
