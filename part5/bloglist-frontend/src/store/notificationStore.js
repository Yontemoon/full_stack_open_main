import { createStore } from 'redux'
import './notificationStore.css'

const notificationReducer = (state = null, action) => {
    switch(action.type) {
        case 'USER_ERROR':
            return (
                <div className="userError">
                    You entered the wrong username or password.
                </div>)
        case 'BLOG_ADDED': 
            return (
                <div className="addBlog">
                    You added a new blog called {action.payload.title} by {action.payload.author}.
                </div>
            )
        case 'BLOG_UPDATE':
            return (
                <div className="addBlog">
                    You updated a blog called {action.payload.title} by {action.payload.author}.
                </div>
            )
        case 'BLOG_DELETE': 
            return (
                <div className="addBlog">
                    You deleted a blog called {action.payload.title} by {action.payload.author}.
                </div>
            )
        case 'RESET':
            return null
        default: 
            return state
    }
}

const notificationStore = createStore(notificationReducer)

export default notificationStore