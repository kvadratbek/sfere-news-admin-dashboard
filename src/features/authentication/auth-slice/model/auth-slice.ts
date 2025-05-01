import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  accessToken:string | null;
  session_id: string | null;
  usedToken: string | null
}

interface AuthTokenPayload {
   accessToken: string | null;
   session_id: string | null;
}
const initialState: AuthState = {
  accessToken: localStorage.getItem('accessToken'),
  session_id: localStorage.getItem('session_id'),
  usedToken: localStorage.getItem("usedToken")
}

const authSlice = createSlice({
  name:"auth",
  initialState,
  reducers:{
     authTokenChange: (state, action: PayloadAction<AuthTokenPayload>)=> {
        localStorage.setItem('accessToken', action.payload.accessToken || "")
        localStorage.setItem('session_id', action.payload.session_id || "")
        state.accessToken = action.payload.accessToken;
        state.session_id = action.payload.session_id;
        state.usedToken = action.payload.accessToken;
     },
     logoutUser: (state) => {
       localStorage.removeItem('accessToken')
       localStorage.removeItem('session_id')
       state.accessToken = null;
       state.session_id = null;
       state.usedToken = null;
     },
     adjustUsedToken: (state, action) => {
       state.usedToken = action.payload;
     }
  }
})
export const {authTokenChange, logoutUser, adjustUsedToken} = authSlice.actions;
export default authSlice.reducer;