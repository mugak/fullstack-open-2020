import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Header = ({ name }) => <h1>{name}</h1>

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
      {text}
    </button>
)

const Stat = ({ text, num }) => (
  <tr>
    <td>{text}</td>
    <td>{num}</td>
  </tr>
)

const Statistics = props => {
  return (
    <>
      <Header name={props.statsTitle} />
      <table>
        <tbody>
          <Stat text="good" num={props.good} />
          <Stat text="neutral" num={props.neutral} />
          <Stat text="bad" num={props.bad} />
          <Stat text="all" num={props.total} />
          <Stat text="average" num={props.total === 0 ? 0 : (props.good - props.bad) / props.total} />
          <Stat text="positive" num={props.total === 0 ? 0 : `${props.good / props.total * 100}%`} />
        </tbody>
      </table>
    </>
  )
}

const App = () => {
  const feedbackTitle = "give feedback"
  const statsTitle = "statistics"

  const [ good, setGood ] = useState(0)
  const [ neutral, setNeutral ] = useState(0)
  const [ bad, setBad ] = useState(0)
  const [ total, setTotal ] = useState(0)

  const increment = (feedback, setFeedback) => {
    setFeedback(feedback + 1)
    setTotal(total + 1)
  }

  return (
    <div>
      <Header name={feedbackTitle} />
      <Button handleClick={() => increment(good, setGood)} text="good"/>
      <Button handleClick={() => increment(neutral, setNeutral)} text="neutral"/>
      <Button handleClick={() => increment(bad, setBad)} text="bad"/>
      <Statistics name={statsTitle} good={good} neutral={neutral} bad={bad} total={total} />
    </div>

  )
}

ReactDOM.render(<App />, document.getElementById("root"))