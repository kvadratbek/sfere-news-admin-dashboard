import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuthTokens } from "@/shared/model/authentication";

interface AuthState {
  tokens: IAuthTokens | null;
}

const initialState: AuthState = {
  tokens: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTokens(state, action: PayloadAction<IAuthTokens>) {
      state.tokens = action.payload;
    },
    clearTokens(state) {
      state.tokens = null;
    },
  },
});

export const { setTokens, clearTokens } = authSlice.actions;
export default authSlice.reducer;
