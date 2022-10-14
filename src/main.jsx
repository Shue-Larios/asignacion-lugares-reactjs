import React from 'react'
import ReactDOM from 'react-dom/client'
import './style.css'
import { HashRouter } from 'react-router-dom'
import { LugaresApp } from './LugaresApp'
import { Provider } from 'react-redux'
import { store } from './store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <LugaresApp />
      </HashRouter>
    </Provider>
  </React.StrictMode>
)
