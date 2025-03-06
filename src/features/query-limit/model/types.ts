interface IQueryLimit {
  labelText: string;
  limitValue: number | undefined;
  limitOnChange: (value: number | undefined) => void;
}

export type { IQueryLimit };
