import React from 'react'

const Person = props => {
    return <div>{props.person.name} {props.person.number} <button onClick={() => props.remove(props.person)}>delete</button></div>
}

const Persons = props => {
    return props.filteredPersons.map(person => <Person key={person.id} person={person} remove={props.remove} />)
}

export default Persons