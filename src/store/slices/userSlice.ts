import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import ApiManager from "../../api/ApiManager";
import axios from "axios"; // Axios HTTP istekleri için kullanılır

const fetchUserData = createAsyncThunk("user/fetchData", async () => {
  const account = await ApiManager.getUserAccount();
  return account;
});

type UserSliceState = {
  userData: User | null;
  token: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: any;
};

const initialState: UserSliceState = {
  userData: null,
  token: null,
  status: "idle",
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userData = action.payload.user;
      state.token = action.payload.token;
    },
    clearUser: (state) => {
      state.userData = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(fetchUserData.fulfilled, (state, action: any) => {
      state.status = "succeeded";
      state.userData = action.payload.user;
      state.token = action.payload.token;
    });
    builder.addCase(fetchUserData.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;

export { fetchUserData };
