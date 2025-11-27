import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    access_token: null,
    refresh_token: null,
    showSplash: true,
  },
  reducers: {
    userLoggedIn: (state, action) => {
      state.user = action.payload.user;
      state.access_token = action.payload.access;
      state.refresh_token = action.payload.refresh;
      state.showSplash = false;

      // Save to localStorage
      localStorage.setItem(
        "auth",
        JSON.stringify({
          user: action.payload.user,
          access_token: action.payload.access,
          refresh_token: action.payload.refresh,
        })
      );
    },

    setShowSplash: (state, action) => {
      state.showSplash = action.payload;
    },

    userUpdated: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      localStorage.setItem(
        "auth",
        JSON.stringify({
          ...JSON.parse(localStorage.getItem("auth")),
          user: state.user,
        })
      );
    },

    userLoggedOut: (state) => {
      state.user = null;
      state.access_token = null;
      state.refresh_token = null;
      localStorage.removeItem("auth");
      state.showSplash = true;
      window.location.reload();
    },
  },
});

export const { userLoggedIn, userUpdated, userLoggedOut, setShowSplash } =
  authSlice.actions;

// Selectors
export const selectUser = (state) => state.auth.user;
export const selectAccessToken = (state) => state.auth.access_token;
export const selectShowSplash = (state) => state.auth.showSplash;

export const authReducer = authSlice.reducer;
