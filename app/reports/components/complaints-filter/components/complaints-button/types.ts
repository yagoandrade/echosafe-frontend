export interface IComplaintsButton {
  items: string[];
  onButtonClick: (value: string) => void;
  title: string;
  selectedItems: string[];
}
