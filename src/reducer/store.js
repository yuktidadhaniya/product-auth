import { configureStore } from '@reduxjs/toolkit';
import product from './list';
export default configureStore({
  reducer: {
    product,
  },
});
