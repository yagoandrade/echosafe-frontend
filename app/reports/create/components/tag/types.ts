export interface ITag {
  tags: string[];
  onRemoveTag: (value: string) => void;
  remove?: boolean;
  cn?: string;
}
