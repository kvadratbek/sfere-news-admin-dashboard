import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token:string | null;
  refreshToken: string | null;
  usedToken: string | null
}

interface AuthTokenPayload {
   accessToken: string | null;
   refreshToken: string | null;
}
const initialState: AuthState = {
  token: localStorage.getItem('accessToken'),
  refreshToken: localStorage.getItem('refreshToken'),
  usedToken: localStorage.getItem("usedToken")
}

const authSlice = createSlice({
  name:"auth",
  initialState,
  reducers:{
     authTokenChange: (state, action: PayloadAction<AuthTokenPayload>)=> {
        localStorage.setItem('accessToken', action.payload.accessToken || '')
        localStorage.setItem('refreshToken', action.payload.refreshToken || '')
        state.token = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.usedToken = action.payload.accessToken;
     },
     logoutUser: (state) => {
       localStorage.removeItem('accessToken')
       localStorage.removeItem('refreshToken')
       state.token = null;
       state.refreshToken = null;
       state.usedToken = null;
     },
     adjustUsedToken: (state, action) => {
       state.usedToken = action.payload;
     }
  }
})
export const {authTokenChange, logoutUser, adjustUsedToken} = authSlice.actions;
export default authSlice.reducer;