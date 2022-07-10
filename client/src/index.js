import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { Provider as ReduxProvider } from 'react-redux'
import { store } from './store'
import { BrowserRouter as Router } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'

const { REACT_APP_GOOGLE_CLIENT_ID: clientId } = process.env

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <GoogleOAuthProvider clientId={clientId}>
        <Router>
          <App />
        </Router>
      </GoogleOAuthProvider>
    </ReduxProvider>
  </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
