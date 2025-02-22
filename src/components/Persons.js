import React from 'react'
import Person from './Person'
import PropTypes from 'prop-types'

const Persons = (props) =>
  <ul>
    {props.personsToShow(props.newFilter).map((person) =>
      <Person key={person.id} person={person}
        handleDelete={props.handleDelete} text="delete"/>
    )}
  </ul>

Persons.propTypes = {
  newFilter: PropTypes.string,
  person: PropTypes.object,
  personsToShow: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
}

export default Persons