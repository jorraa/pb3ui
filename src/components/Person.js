import React from 'react'

const Person = (props) => {
    const handleClick = (event) => {
        // eslint-disable-next-line no-restricted-globals
        const ok = confirm('Delete ' + event.target.name + '?')
        if(ok){ 
            props.handleDelete(event.target.id)
        }
    }
    
    return(
    <li>
        #{props.person.name}# {props.person.number }
        <button id={props.person.id} name={props.person.name} onClick={handleClick}>
            {props.text}
        </button>
    </li>
    )
}
export default Person