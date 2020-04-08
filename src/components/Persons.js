import React from 'react'
import Person from './Person'
const Persons = (props) => 
<ul>
    {props.personsToShow(props.newFilter).map((person, i) => 
        <Person key={person.name} person={person} 
        handleDelete={props.handleDelete} text="delete"/>
    )}
</ul>

export default Persons