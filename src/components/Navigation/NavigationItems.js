import React from 'react'
import NavigationItem from './NavigationItem/NavigationItem'

import classes from './NavigationItems.module.sass'

const NavigationItems = (props) => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem exact link='/order'>Burger builder</NavigationItem>
            { props.isAuth
            ? <NavigationItem link='/orders'>Orders</NavigationItem>
            : null }
            { props.isAuth 
            ? <NavigationItem link='/logout'>Logout</NavigationItem>
            : <NavigationItem link='/auth'>Auth</NavigationItem> }

        </ul>
    )
}

export default NavigationItems
