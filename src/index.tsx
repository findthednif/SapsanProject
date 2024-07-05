import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import App from './Components/App/App'
import store from './Redux/store'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
