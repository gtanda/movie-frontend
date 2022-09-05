import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import axios from 'axios'
import './styles/Index.css'
axios.defaults.withCredentials = true

ReactDOM.createRoot(document.getElementById('root')).render(<App />)

// TODO: Fix animation for removing and introducing videodisplay
// TODO: Check if UTIL functions work properly (YT API QUOTA HIT -- RECHECK NEXT DAY)
