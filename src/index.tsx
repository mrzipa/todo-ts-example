import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css'
import './normalize.css'
import App from './App'
import store from './store/store'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
