const initialState = {
  newPicturesRequested: 0,
  currentPage: 1,
  data: [],
  inputValue: '',
  loading: false,
  hasMore: true,
  error: false,
  noResults: false,
}

export default function picturesReducer<T>(state = initialState, action: { type: string; payload?: T }) {
  switch (action.type) {
    case 'pictures_loading':
      return { ...state, loading: true, noResults: false }
    case 'new_pictures_requested':
      return { ...state, newPicturesRequested: state.newPicturesRequested + 1 }
    case 'currentPage_change':
      return { ...state, currentPage: action.payload }
    case 'input_value_change':
      return { ...state, inputValue: action.payload }
    case 'pictures_fetch_update':
      return {
        ...state,
        //@ts-expect-error
        data: [...state.data, ...action.payload],
        loading: false,
      }
    case 'new_pictures_fetched':
      return {
        ...state,
        data: action.payload,
        loading: false,
      }
    case 'no_more_pictures':
      return { ...state, hasMore: false }
    case 'has_more_pictures':
      return { ...state, hasMore: true }
    case 'error_handler':
      return { ...state, error: action.payload, loading: false }
    case 'no_search_results':
      return { ...state, noResults: true, loading: false }
    default:
      return state
  }
}
