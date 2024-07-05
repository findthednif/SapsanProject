import axios from 'axios'
// import MockAdapter from "axios-mock-adapter";

// const mock = new MockAdapter(axios);

// mock.onGet("https://api.unsplash.com/search/photos").reply(403, {
//   errors: ["Forbidden"]
// });

const url = 'https://api.unsplash.com/search/photos'
const API_KEY = 'tt0VzTpeC8Gl2dsUhS8kEU_BkaeUtYrEOlv1xEdkTW4'
export const getPictures = async (query: string, page: number) => {
  try {
    const response = await axios({
      url: url,
      params: {
        client_id: API_KEY,
        page: page,
        query: query,
        per_page: 30,
      },
    })
    return response.data.results
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error, 'axios error')
      if (error.status === 403 && typeof error.response?.data === 'string') {
        throw new Error(error.response?.data)
      } else {
        throw new Error(error.message || 'Unknown Error')
      }
    }
  }
}
