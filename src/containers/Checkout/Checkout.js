import React, { Component } from 'react'
import { Route, Redirect } from 'react-router'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'

import {connect} from 'react-redux'

class Checkout extends Component {


    clickCanceled = () => {
        this.props.history.goBack();
    }
    clickContinued = () => {
        this.props.history.replace('/checkout/contact-data')
    }
    
    render() {
        let summary = <Redirect to="/"/>
        if (this.props.ings) {
            const purchasedRedirect = this.props.purchased ? <Redirect to=""/> : null;
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary 
                    ingredients={this.props.ings}
                    clickCanceled={this.clickCanceled}
                    clickContinued={this.clickContinued}/>
                    <Route 
                    path={this.props.match.url + "/contact-data"} 
                    component={ContactData}/>
                </div>  
            )
        }
        return summary
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.burgerCost,
        purchased: state.order.purchased
    }
}



export default connect(mapStateToProps)(Checkout)