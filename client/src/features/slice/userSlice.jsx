import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  email: '',
  company: '',
  industry: '',
  team: '',
  notification: '',
  theme: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setStep1(state, action) {
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
    setStep2(state, action) {
      state.company = action.payload.company;
      state.industry = action.payload.industry;
      state.team = action.payload.team;
    },
    setStep3(state, action) {
      state.notification = action.payload.notification;
      state.theme = action.payload.theme;
    },
    loadFromLocalStorage(state, action) {
      return { ...state, ...action.payload };
    }
  }
});

export const { setStep1, setStep2, setStep3, loadFromLocalStorage } = userSlice.actions;
export default userSlice.reducer;