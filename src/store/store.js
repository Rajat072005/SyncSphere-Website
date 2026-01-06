import { configureStore } from '@reduxjs/toolkit';
import userReducer from '/src/features/slice/userSlice.jsx';

export default configureStore({
  reducer: {
    user: userReducer,
  },
});