import React from 'react'
import {connect} from 'react-redux'
import Layout from './components/Layout/Layout'
import {Redirect, Route, Switch} from 'react-router-dom'
import asyncComponent from './hoc/asyncComponent/asyncComponent'
import * as actions from './store/actions/index'

import Logout from './containers/Auth/Logout/Logout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'

const asyncCheckout = asyncComponent( () => {
  return import('./containers/Checkout/Checkout')
} )

const asyncOrders = asyncComponent( () => {
  return import('./containers/Orders/Orders')
} )

const asyncAuth = asyncComponent( () => {
  return import('./containers/Auth/Auth')
} )


function App(props) {
  React.useMemo( () => {
    props.onTryAutoSignUp();
    // eslint-disable-next-line
  }, [] )

  let routes = (
    <Switch>
      <Route path="/auth" component={asyncAuth}/>
      <Route path="/order" component={BurgerBuilder}/>
      <Redirect from="/" to="/order" />
      <Redirect to="/order"/>
    </Switch>
  )

  if (props.isAuth) routes = (
    <Switch>
      <Route path="/checkout" component={asyncCheckout} />
      <Route path="/orders" component={asyncOrders}/>
      <Route path="/order" component={BurgerBuilder}/>
      <Route path="/logout" component={Logout}/>
      <Route path="/auth" component={asyncAuth}/>
      <Redirect from="/" to="/order" />
      <Redirect to="/order"/>
    </Switch>
  )

  return (
    <div>
      <Layout>
        {routes}
      </Layout>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
