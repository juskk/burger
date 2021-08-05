import React from 'react'
import {connect} from 'react-redux'

import Auxiliary from '../../hoc/Auxiliary'
import SideDrawer from '../SideDrawer/SideDrawer'
import Toolbar from '../Toolbar/Toolbar'

import classes from './Layout.module.sass'


const Layout = (props) => {

    let [visible, setVisible] = React.useState(false);

    function visibleHandler() {
        setVisible( (prev) => {
            return !prev
        })
    }

    return (
        <Auxiliary>
            <Toolbar auth={props.isAuth} hide={visibleHandler}/>
            <SideDrawer auth={props.isAuth} visible={visible} hide={visibleHandler}/>
            <main className={classes.content}>
                {props.children}
            </main>
        </Auxiliary>
    )
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null 
    }
}

export default connect(mapStateToProps)(Layout)

