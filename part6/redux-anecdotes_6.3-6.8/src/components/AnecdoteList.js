import { useSelector, useDispatch } from 'react-redux'
import { changeAnecdoteVotes } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer';
// import { Filter } from '../reducers/filterReducer'

const Anecdote = ({anecdote}) => {
    const dispatch = useDispatch();

    const voteHandler = () => {
        dispatch(changeAnecdoteVotes(anecdote))
        dispatch(showNotification(`you voted ${anecdote.content}`, 5))

    }
    return (
        <div>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={voteHandler}>Vote</button>
            </div>
        </div>
    )
}


const AnecdoteList = () => {

    const anecdotes = useSelector(({ filter, anecdotes }) => {

        if (filter === null) {
            return anecdotes
        } 
        
        const regex = new RegExp( filter, 'i' )
        return anecdotes.filter(anecdote => anecdote.content.match(regex) )
        
    })

    const byVotes = (note1, note2) => note2.votes - note1.votes

    return (

        anecdotes.toSorted(byVotes).map(anecdote => <Anecdote key={anecdote.id} anecdote={anecdote}/>)
    )
}

export default AnecdoteList