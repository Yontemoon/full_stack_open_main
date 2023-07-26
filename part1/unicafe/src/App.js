import { useState } from 'react';

const Button = ({eventHandler, text}) => {
  return (
    <div>
      <button onClick={eventHandler}>{text}</button>
    </div>
  )
}

const Statistics = ({good, bad, neutral, average}) => {
  const total = good + bad + neutral;
  if (total === 0) {
    return <p>No feedback given...</p>
  }
  return (
    <div>
      <tr>
        <td>Good: </td>
        <td>{good}</td>
      </tr>
      <tr>
        <td>Bad: </td>
        <td>{bad}</td>
      </tr>
      <tr>
        <td>Neutral: </td>
        <td>{neutral}</td>
      </tr>
      <tr>
        <td>Total:</td>
        <td>{total}</td>
      </tr>
      <tr>
        <td>Average:</td>
        <td>{average / total}</td>
      </tr>
      <tr>
        <td>Positive:</td>
        <td>{Math.floor(good / (total) * 100)}%</td>
      </tr>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [average, setAverage] = useState(0);

  const handleGood = () => {
    setGood(good + 1);
    setAverage(average + 1);
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1);
    setAverage(average + 0);
  }

  const handleBad = () => {
    setBad(bad + 1)
    setAverage(average - 1);
  }



  return (
    <div>
      <h1>Give Feedback</h1>
      <div>
        <Button eventHandler={handleGood} text ="good"/>
        <Button eventHandler={handleNeutral} text="neutral"/>
        <Button eventHandler={handleBad} text="bad"/>
      </div>


      <h1>Statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral} average={average}/>
    </div>
  );
}

export default App;
