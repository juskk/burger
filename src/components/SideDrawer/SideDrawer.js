import React from 'react'
import Auxiliary from '../../hoc/Auxiliary'
import Logo from '../Logo/Logo'
import NavigationItems from '../Navigation/NavigationItems'
import Backdrop from '../UI/Backdrop/Backdrop'

import classes from './SideDrawer.module.sass'

const SideDrawer = (props) => {
    let sideDrawerClasses = [classes.SideDrawer, classes.Close]

    if (props.visible) sideDrawerClasses = [classes.SideDrawer, classes.Open]

    return (
        <Auxiliary>
            <Backdrop show={props.visible} hide={props.hide}/>
            <div  onClick={props.hide} className={sideDrawerClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>       
                    <NavigationItems isAuth={props.auth}/>
            </div>
        </Auxiliary>
    )
}

export default SideDrawer
