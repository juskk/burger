import React from 'react'
import burgerLogo from '../../assets/images/burger-logo.png'

import classes from './Logo.module.sass'

const Logo = (props) => {
    return (
        <div className={classes.Logo}>
            <img  src={burgerLogo} alt="logo img"/>
        </div>
    )
}

export default Logo