import React from 'react'
import Auxiliary from '../../../hoc/Auxiliary'
import Button from '../../UI/Button/Button'

const OrderSummary = (props) => {

    const orderIngredients = Object.keys(props.ingredients)
    .map( ingKey => {
        return <li key={ingKey}>{ingKey}: {props.ingredients[ingKey]}</li>
    } )

    return (
        <Auxiliary>
            <h3>Time to order</h3>
            <p>You chose these ingredients:</p>
            <ul>
                {orderIngredients}
            </ul>
            <p>Total price: {props.price}</p>
            <p>Ready to checkout?</p>
            <Button clicked={props.cancel} type='Danger'>Cancel</Button>
            <Button clicked={props.continue} type='Success'>Continue</Button>
        </Auxiliary>
    )
}

export default OrderSummary
