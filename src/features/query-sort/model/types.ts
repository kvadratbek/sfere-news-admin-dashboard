interface IQuerySort {
  labelText: string;
  selectedOption: string | undefined;
  onOptionChange: (value: string | undefined) => void;
}

export type { IQuerySort };
