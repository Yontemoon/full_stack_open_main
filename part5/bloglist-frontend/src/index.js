import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import notificationStore from './store/notificationStore'

ReactDOM.createRoot(document.getElementById('root')).render(
<Provider store = {notificationStore}>
    <App />
</Provider>
)