import axios from '../../axios-orders';
import React from 'react'
import {connect} from 'react-redux'
import Order from '../../components/Order/Order'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Loader from '../../components/UI/Loader/Loader'

import * as actions from '../../store/actions/index'

const Orders = (props) => {

    React.useMemo( () => {
        props.onFetchOrders(props.token, props.userId)
        // eslint-disable-next-line
    }, [] )

    let orders = <Loader/>
    if (!props.loading) orders = (
        <div>
            {props.orders.map( order => (
                <Order key={order.id} price={order.price} ingredients={order.ingredients}/>
            ))}
        </div>
    )
    return orders
}


const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
