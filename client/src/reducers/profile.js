import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  profile: [],
  profiles: [],
  repos: [],
  loading: true,
  errors: {},
};
const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    getProfile(state, action) {
      state.profile = action.payload;
      state.loading = false;
    },profileError(state,action){
        state.errors = action.payload
        state.loading = false;
    },setProfile(state, action){
        state.profile = action.payload
        state.loading = false; 

    },clearProfile(state, action){
      state.profile = {user:null}
      // state.errors = {},
      state.loading = false;
    },setExperience(state, action){
        state.profile.experience = action.payload
    },getAllProfiles(state, action){
      state.profiles = action.payload
      state.loading = false
    },
    getRepos(state,action){
     state.repos = action.payload 
     state.loading = false;
    }
  }

});

export default profileSlice;
