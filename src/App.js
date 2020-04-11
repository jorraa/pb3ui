import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [infoMessage, setInfoMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  //Useless after asking confirm
  //const alertDuplicate= (newName) => alert(`${newName} is already added to phonebook`)

  const addPerson = (event) => {
    event.preventDefault()
    // no empty name, must be 2 long
    if(!newName) {
      setErrorMessage('name missing')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      return
    }
    // no empty number
    if(!newNumber){
      setErrorMessage('number missing')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      return
    }

    const personObject = {
      name: newName,
      number: newNumber,
      date: new Date().toISOString()
    }
    if(persons.filter(person => person.name === newName).length){
      //first chnage number if person exists

      // eslint-disable-next-line no-restricted-globals
      const ok = confirm(newName + ' is already added to phonebook, replace the old number with new one?')
      if(!ok){ return }
      const person = persons.filter(person => person.name === newName)[0]

      personService.update(person.id, personObject)
        .then(returnedPerson => {
          setPersons(persons.filter(person => person.name !== newName).concat(returnedPerson))
          // eslint-disable-next-line no-undef
          setInfoMessage(`${returnedPerson.name}'s number changed in phonebook!`)
          setTimeout(() => {
            setInfoMessage(null)
          }, 3000)
        })
        .catch(() => {
          setErrorMessage(`Information of ${person.name} has already been removed from server`)
          setPersons(persons.filter(p => p.id !== person.id))
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }else{ //normal create
      console.log('normalCreate')
      personService
        .create(personObject)
        .then(returnedPerson => {
          console.log('retPers', returnedPerson)
          if(returnedPerson.error) {
            setErrorMessage(returnedPerson.error)
            setTimeout(() => {
              setErrorMessage(null)
            }, 8000)
            return
          }
          setPersons(persons.concat(returnedPerson))
          // eslint-disable-next-line no-undef
          setInfoMessage(`${returnedPerson.name} added to phonebook!`)
          setTimeout(() => {
            setInfoMessage(null)
          }, 3000)
        })
        .catch((error) => {
          console.log('Error in create', error)
          setErrorMessage('Adding new number failed!')
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const handleDelete = id => {
    console.log('handleDelete', id)
    const removedPerson = persons.filter(person => person.id === id)[0]
    personService.remove(id)
      .then( () => {
        setPersons(persons.filter(person => person.id !== id))
        // eslint-disable-next-line no-undef
        setInfoMessage(`${removedPerson.name} removed from phonebook!`)
        setTimeout(() => {
          setInfoMessage(null)
        }, 3000)
      })
      .catch(error => {
        console.log('error in delete', error.message)
        if(error.message.includes('404')){
          setErrorMessage(`Information of ${removedPerson.name} has already been removed from server`)
          setPersons(persons.filter(person => person.id !== id))
        }else{
          setErrorMessage(`Removing ${removedPerson.name} from phonebook failed!`)
        }
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const personsToShow = newFilter =>
    newFilter.length
      ?persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
      :persons

  console.log('persons', persons)

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} className='error'/>
      <Notification message={infoMessage} className='info'/>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>

      <h3>add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber}
        handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>

      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} newFilter={newFilter} handleDelete={handleDelete}/>
    </div>
  )
}

export default App