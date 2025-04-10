import {configureStore} from "@reduxjs/toolkit";

import authReducer from "./Slice/Authslice"
import childUserReducer from './Slice/TableNavbarSlice'

export const store = configureStore({
    reducer: {
      auth: authReducer,
      childUser: childUserReducer, 
    },
  });