import React from 'react'

const Person = props => <div>{props.name} {props.number}</div>

const Persons = props => props.filteredPersons.map(person => <Person key={person.number} name={person.name} number={person.number} />)

export default Persons