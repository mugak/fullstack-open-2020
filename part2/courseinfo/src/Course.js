import React from "react"

const Course = ({ course }) => {
    return (
      <div>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    ) 
  }

const Header = ({ name }) => <h1>{name}</h1>

const Content = ({ parts }) => 
    <div>
      {parts.map(part => 
      <Part key={part.id} part={part} />
      )}
    </div>

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Total = ({ parts }) => {
  const reducer = (acc, curr) => acc + curr.exercises
  return (
    <p><b>total of {parts.reduce(reducer, 0)} exercises</b></p>
  )
}

export default Course