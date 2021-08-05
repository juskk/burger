import React from 'react'

import classes from './Button.module.sass'

const Button = (props) => {
    return (
        <button disabled={props.disabled} onClick={props.clicked} className={[classes.Button, classes[props.type]].join(' ')}>
            {props.children}
        </button>
    )
}

export default Button
