import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const getRandomIndex = () => Math.floor(Math.random() * props.anecdotes.length)

  const [selected, setSelected] = useState(getRandomIndex())
  const [allVotes, setAllVotes] = useState(new Array(anecdotes.length).fill(0))

  const maxIndex = allVotes.indexOf(Math.max(...allVotes))

  const selectVote = () => {
    const newVotes = [...allVotes]
    newVotes[selected] += 1
    setAllVotes(newVotes)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {props.anecdotes[selected]}
      <br />
      has {allVotes[selected]} votes
      <br />
      <button onClick={() => selectVote()}>vote</button>
      <button onClick={() => setSelected(getRandomIndex())}>next anecdote</button>

      <h1>Anecdote with most votes</h1>
      {props.anecdotes[maxIndex]}
      <br />
      has {allVotes[maxIndex]} votes
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)