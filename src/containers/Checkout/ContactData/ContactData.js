import classes from './ContactData.module.sass'
import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button'
import Input from '../../../components/UI/Input/Input'
import Loader from '../../../components/UI/Loader/Loader'
import axios from '../../../axios-orders'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../../store/actions/index'

import {connect} from 'react-redux'

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'name',
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                value: '',
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'street',
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'zip code',
                },
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5,
                },
                valid: false,
                touched: false,
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'country',
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'e-mail',
                },
                validation: {
                    required: true,
                    isEmail: true,
                },
                valid: false,
                touched: false,
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [ {value: 'fastest', displayValue: 'fastest'}, {value: 'in time', displayValue: 'in time'} ]
                },
                valid: true,
                touched: false,
                value: 'fastest'
            }
        },
        isValid: false,
    }

    orderHandler = () => {
        const info = {};
        for (let elName in this.state.orderForm) {
            info[elName] = this.state.orderForm[elName].value;
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price.toFixed(2),
            info,
            userId: this.props.userId         
        }

        this.props.onOrderBurget(order, this.props.token)
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
        const newForm = {...this.state.orderForm};
        const newFormEl = {...newForm[id]};
        newFormEl.value = event.target.value;
        newFormEl.valid = this.validationCheck(newFormEl.value, newFormEl.validation)
        newFormEl.touched = true;

        let updatedValid = true;
        newForm[id] = newFormEl;

        for(let item in newForm) {
            updatedValid = newForm[item].valid && updatedValid
        }
        this.setState({orderForm: newForm, isValid: updatedValid});
    }
    

    render() {
        let formElementsArray =[];
        for (let key in this.state.orderForm) {
            formElementsArray.push({id: key, config: this.state.orderForm[key]})
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map( el => {
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
                } )}
                <Button disabled={!this.state.isValid} type="Success">Order</Button>
            </form>
        )
        if (this.props.loading) form = <Loader/>
        return (
            <div className={classes.ContactData}>
                <h2>Enter your Contact Data</h2>
                {form}   
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.burgerCost,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurget: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));