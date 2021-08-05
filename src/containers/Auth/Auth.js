import React, { Component } from 'react'
import * as actions from '../../store/actions/index'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'

import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import Loader from '../../components/UI/Loader/Loader'


import classes from './Auth.module.sass'



class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Adress',
                },
                validation: {
                    required: true,
                    isEmail: true,
                },
                valid: false,
                touched: false,
                value: '',
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password',
                },
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false,
                value: '',
            },
        },
        isSignup: true,
    }

    componentDidMount() {
        if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath()
        }
    }


    validationCheck(value, validation) {
        let elValid = true;

        if (validation) {
            if (validation.required) elValid = value.trim() !== '' && elValid
            if (validation.minLength) elValid = value.length >= validation.minLength && elValid
            if (validation.maxLength) elValid = value.length <= validation.maxLength && elValid
            if (validation.isEmail) {
                const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
                elValid = validRegex.test(value) && elValid;
            }
        }
        return elValid
    }

    changeValueHandler(event, id) {
        const newForm = {...this.state.controls,
                        [id]: {
                            ...this.state.controls[id],
                            value: event.target.value,
                            valid: this.validationCheck(event.target.value, this.state.controls[id].validation),
                            touched: true,
                                }
                        }
        this.setState({controls: newForm})
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
    }
    
    switchAuthModehandler = () => {
        this.setState(prevState => {
            return {isSignup: !prevState.isSignup}
        })
    }

    
    render() {
        let formElementsArray =[];
        for (let key in this.state.controls) {
            formElementsArray.push({id: key, config: this.state.controls[key]})
        }

        let form = formElementsArray.map(el => {
            return <Input 
                        key={el.id}
                        invalid={!el.config.valid} 
                        shouldValid = {el.config.validation} 
                        Changed={ (event) => this.changeValueHandler(event, el.id)} 
                        elementType={el.config.elementType} 
                        elementConfig={el.config.elementConfig} 
                        elTouched = {el.config.touched}
                        value={el.config.value}
                    />
        })

        if (this.props.loading) form = <Loader/>

        let errorMessage = null;

        if (this.props.error) errorMessage = (
            <p>{this.props.error.message}</p>
        )

        let authRedicert = null;

        if (this.props.isAuth) authRedicert = <Redirect to={this.props.authRedirectPath} />

        return (
            <div className={classes.Auth}>
                <p>{this.state.isSignup ? "CREATING AN ACCOUNT" : "LOGGING IN"}</p>
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button type="Success">SUBMIT</Button>
                </form>
                <Button  clicked={this.switchAuthModehandler} type="Danger">SWITCH TO {this.state.isSignup ? "SIGN IN" : "SIGN UP"}</Button>
                {authRedicert}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)