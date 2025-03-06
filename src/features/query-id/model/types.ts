// import { HTMLInputTypeAttribute } from "react";

interface IQueryId {
  labelText: string;
  elementId: string;
  // inputType: HTMLInputTypeAttribute;
  id: number | undefined;
  placeholder: string;
  onIdChange: (value: number | undefined) => void;
  // onIdChange: React.ChangeEventHandler<HTMLInputElement>;
}

export type { IQueryId };
