import React from 'react'
import Auxiliary from '../../../hoc/Auxiliary'
import Backdrop from '../Backdrop/Backdrop'
import classes from './Modal.module.sass'

const Modal = (props) => {
    return (
        <Auxiliary>
            <div style={{transform: props.show ? 'translateY(0)' : 'translateY(-100vh)' }} className={classes.Modal}>
                {props.children}
            </div>
            <Backdrop hide = {props.hideModal}  show={props.show}/>
        </Auxiliary>
        
    )
        
}

export default Modal
