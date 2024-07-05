import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../Types/storeTypes'
export const useTsDispatch = useDispatch.withTypes<AppDispatch>()
export const useTsSelector = useSelector.withTypes<RootState>()
