import axios from '../../axios-orders'
import React from 'react'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Burger from '../../components/Burger/Burger'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Modal from '../../components/UI/Modal/Modal'
import Auxiliary from '../../hoc/Auxiliary'
import Loader from '../../components/UI/Loader/Loader'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

import {connect} from 'react-redux'
import * as actions from '../../store/actions/index'


const BurgerBuilder = (props) => {
    const [purchasing, setPurchasing] = React.useState(false);
    
    React.useEffect( () => {
        props.onInitIngredients();
        // eslint-disable-next-line
    }, [])

    function purchasingContinue() {
        props.onInitPurchase() 
        props.history.push('/checkout')
    }

    function purchasingHandler() {
        if (props.isAuth) setPurchasing(!purchasing)
        else {
            props.onSetAuthRedirectPath('/checkout')
            props.history.push('/auth')
        }
    }

    function purchasableHandler(ing) {
        const sum = Object.keys(ing)
        .map( name => {
            return ing[name]
        })
        .reduce((sum,el) => {return sum += el},0)
        return sum > 0
    }


    let disabledIngredients = {...props.ings};

    for (let key in disabledIngredients) {
        if (disabledIngredients[key] <= 0) disabledIngredients[key] = true
        else disabledIngredients[key]  = false
    }
    let orderPart = null;
    let burger = props.error ? <p>the app is broken</p> : <Loader/>
    if (props.ings) {
        burger = (
            <Auxiliary>
                <Burger ingredients={props.ings}/>
                <BuildControls  
                purchase = {purchasingHandler} 
                isPurchasable={purchasableHandler(props.ings)} 
                cost = {props.price} 
                disabled = {disabledIngredients} 
                addIngredient = { props.onIngredientAdded } 
                removeIngredient = { props.onIngredientRemoved }
                isAuth={props.isAuth}/>
            </Auxiliary>
        )
        orderPart = <OrderSummary  
                    continue={purchasingContinue} 
                    cancel={purchasingHandler} 
                    price={props.price.toFixed(2)} 
                    ingredients={props.ings}/>;
    }

    return (
        <Auxiliary>
            <Modal hideModal = {purchasingHandler} show = {purchasing}>
            {orderPart} 
            </Modal>
            {burger}
        </Auxiliary>
    )
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.burgerCost,
        error: state.burgerBuilder.error,
        isAuth: state.auth.token !== null,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));  
