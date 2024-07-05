import { configureStore } from '@reduxjs/toolkit'
import picturesReducer from './Pictures/reducer'

const store = configureStore({
  reducer: {
    picturesReducer,
  },
})
export default store
