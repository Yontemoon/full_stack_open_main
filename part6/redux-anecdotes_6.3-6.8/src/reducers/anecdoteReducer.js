import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    increaseVotes(state, action) {
      const id = action.payload.id
      const noteToIncrease = state.find(n => n.id === id)
      const changedNote = {
        ...noteToIncrease,
        votes: noteToIncrease.votes + 1
      }
      return state.map(note => 
        note.id !== id ? note : changedNote)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})


export const { appendAnecdote, increaseVotes, setAnecdotes} = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    console.log(anecdotes)
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const changeAnecdoteVotes = (anecdote) => {
  return async dispatch => {
    const changedAnecdoteVote = await anecdoteService.changeVote(anecdote)
    dispatch(increaseVotes(changedAnecdoteVote))
  }
}
export default anecdoteSlice.reducer