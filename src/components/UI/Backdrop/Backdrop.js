import React from 'react'
import classes from './Backdrop.module.sass'

const Backdrop = (props) => {
    return props.show ? <div onClick={props.hide} className={classes.Backdrop}></div> : null
}

export default Backdrop
