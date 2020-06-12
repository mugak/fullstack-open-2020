import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ filteredPersons, setFilteredPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
        setFilteredPersons(initialPersons)
      })
    }, [])

  const addPerson = event => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }

    if (persons.some(person => person.name === newPerson.name)) {
      if(window.confirm(`${newPerson.name} is already added to phonebook, do you want to replace their number?`)) {
        personService
          .update(persons.find(person => person.name === newPerson.name).id, newPerson)
          .then(updatedPerson => {
            setPersons(persons.map(person => person.id === updatedPerson.id ? updatedPerson : person))
            if (updatedPerson.name.toLowerCase().includes(newFilter.toLowerCase())) {
              setFilteredPersons(filteredPersons.map(person => person.id === updatedPerson.id ? updatedPerson : person))
            }
            setNewName('')
            setNewNumber('')
          })
      }
    } else {
      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          if (returnedPerson.name.toLowerCase().includes(newFilter.toLowerCase())) {
            setFilteredPersons(filteredPersons.concat(returnedPerson))
          }
          setNewName('')
          setNewNumber('')
        })
    }
  }
  
  const removePerson = removedPerson => {
    if (window.confirm(`Are you sure you want to delete ${removedPerson.name}?`)) {
      personService.remove(removedPerson.id)
      setPersons(persons.filter(person => person.id !== removedPerson.id))
      setFilteredPersons(filteredPersons.filter(person => person.id !== removedPerson.id))   
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

      <Persons filteredPersons={filteredPersons} remove={removePerson}/>
    </div>
  )
}

export default App