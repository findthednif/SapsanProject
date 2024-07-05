import { Result } from "../../Types/apiTypes"

export const picturesLoading = () => ({ type: 'pictures_loading' })
export const currentPageChange = (value: number) => ({ type: 'currentPage_change', payload: value })
export const picturesFetchUpdate = (value: Result[]) => ({ type: 'pictures_fetch_update', payload: value })
export const newPicturesFetched = (value: Result[]) => ({ type: 'new_pictures_fetched', payload: value })
export const inputValueChange = (value: string) => ({ type: 'input_value_change', payload: value })
export const noMorePictures = () => ({ type: 'no_more_pictures' })
export const hasMorePictures = () => ({ type: 'has_more_pictures' })
export const errorHandler = (value: string) => ({ type: 'error_handler', payload: value })
export const noSearchResults = () => ({ type: 'no_search_results' })
export const newPicturesRequest = () => ({ type: 'new_pictures_requested' })
