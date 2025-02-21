import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LanguageState {
  selectedLanguage: string;
  availableLanguages: string[];
}

const initialState: LanguageState = {
  selectedLanguage: "en",
  availableLanguages: [],
};

export const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      state.selectedLanguage = action.payload;
    },
    setAvailableLanguages: (state, action: PayloadAction<string[]>) => {
      state.availableLanguages = action.payload;
    },
  },
});

export const { setLanguage, setAvailableLanguages } = languageSlice.actions;
export default languageSlice.reducer;
