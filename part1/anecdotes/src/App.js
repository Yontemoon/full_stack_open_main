import { useState } from 'react'

const points = new Array(8).fill(0);
const pointsCopy = [...points];

const Button = ({eventHandler, text}) => {
  return (
    <button onClick={eventHandler}>{text}</button>

  )
}


const App = () => {

  const [selected, setSelected] = useState(0)
  const [point, setPoint] = useState(0);
  const [mostPoint, setMostPoint] = useState(0);
  const [mostPointIndex, setMostPointIndex] = useState(0);
  
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const handleRandom = () => {
    const min = Math.ceil(0);
    const max = Math.floor(8);
    const randomNum = Math.floor(Math.random()*(max - min) + min);
    setSelected(randomNum)

  }

  const givePoints = () => {
    pointsCopy[selected] += 1;
    setPoint(point + 1);
    let maxPoints = Math.max(...pointsCopy);
    let indexOfMaxPoints = pointsCopy.indexOf(maxPoints);
    setMostPointIndex(indexOfMaxPoints);
    setMostPoint(maxPoints)
  }

  return (
    <div>
      <h1>Anecdote of the Day</h1>
      <div>{anecdotes[selected]}</div>
      <div>Has: {pointsCopy[selected]}</div>
      <Button eventHandler={givePoints} text="Vote"/>
      <Button eventHandler={handleRandom} text="Next Anecdote"/>

      <h1>Anecdote with most Votes</h1>
      <div>{anecdotes[mostPointIndex]}</div>
      <div>Most points: {mostPoint}</div>
    </div>

  )
}

export default App