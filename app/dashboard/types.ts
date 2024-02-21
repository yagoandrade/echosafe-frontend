export interface ICases {
  type: string;
  description: string;
  date: Date;
}

export interface IDashInfo {
  month: string;
  cases: ICases[];
}
