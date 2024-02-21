export type ComplaintIndexes = "time" | "status" | "category";

export type ComplaintFilter = {
  category: string[];
  status: string[];
  time: string;
};
