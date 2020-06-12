import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ filteredPersons, setFilteredPersons ] = useState(persons)
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  const addPerson = event => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }

    if (persons.some(person => person.name === newPerson.name && person.number === newPerson.number)) {
      alert(`${newPerson.name} is already added to phonebook`)
    } else {
      setPersons(persons.concat(newPerson))
      if (newPerson.name.toLowerCase().includes(newFilter.toLowerCase())) {
        setFilteredPersons(filteredPersons.concat(newPerson))

      }
      setNewName('')
      setNewNumber('')
    }
  }

  const handleFilterChange = event => {
    setNewFilter(event.target.value)
    const newFilteredPersons = persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase()))
    setFilteredPersons(newFilteredPersons)
  }

  const handleNameChange = event => setNewName(event.target.value)
  const handleNumberChange = event => setNewNumber(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter value={newFilter} onChange={handleFilterChange} />

      <h2>Add a new:</h2>

      <PersonForm onSubmit={addPerson} nameValue={newName} nameOnChange={handleNameChange} numberValue={newNumber} numberOnChange={handleNumberChange} />
  
      <h2>Numbers</h2>

      <Persons filteredPersons={filteredPersons}/>
    </div>
  )
}

export default App