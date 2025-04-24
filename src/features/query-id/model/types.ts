interface IQuerySelect {
  labelText: string;
  elementId: string;
  id: number | string | undefined;
  placeholder: string;
  onIdChange: (value: number | undefined) => void;
}

export type { IQuerySelect };
