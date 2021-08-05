import React from 'react'

import Logo from '../Logo/Logo'
import NavigationItems from '../Navigation/NavigationItems'
import classes from './Toolbar.module.sass'

const Toolbar = (props) => {
    return (
        <div className={classes.Toolbar}>
            <div  className={classes.DrawerToggle} onClick={props.hide}>
                <div/>
                <div/>
                <div/>
            </div>
            <Logo />
            <nav className={classes.Mobile}>
                <NavigationItems isAuth={props.auth}/>
            </nav>
        </div>
    )
}

export default Toolbar
