import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { showNotification } from "../reducers/notificationReducer"

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.name.value
        event.target.name.value = ""
        dispatch(createAnecdote(content))
        dispatch(showNotification(`You added a new anecdote: "${content}"`, 5))
  }

  return (
    <div>
        <h2>create new</h2>
        <form onSubmit={addAnecdote}>
            <div><input name="name"/></div>
            <button>create</button>
        </form>
    </div>
  )
}

export default AnecdoteForm