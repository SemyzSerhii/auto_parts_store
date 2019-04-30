import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import './style/App.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.min.css'

import ProductsList from './components/ProductsList'
import Page from './components/Page'
import Product from './components/Product'
import UserProfile from './components/UserProfile'
import CategoriesList from './components/CategoriesList'
import Cart from './components/Cart'
import UserOrders from './components/UserOrders'
import OrderShow from './components/OrderShow'
import CreateOrder from './components/CreateOrder'
import Menu from './components/Menu'
import NotFound from './components/NotFound'
import AdvancedSearch from './components/AdvancedSearch'
import VinSearch from './components/VinSearch'

class App extends Component {
       render() {
        return (
            <div className='App'>
                <div className='header'>
                    <Menu/>
                </div>
                <div className='row'>
                    {(window.location.pathname !== '/cart'
                        && window.location.pathname !== '/orders') ? <CategoriesList/> : ''}
                    <div className='col container'>
                        <BrowserRouter>
                            <Switch>
                                <Route exact path='/' component={ProductsList}/>
                                <Route path='/categories/:id' component={ProductsList}/>
                                <Route path='/pages/:id' component={Page}/>
                                <Route path='/products/:id' component={Product}/>
                                <Route path='/user' component={UserProfile}/>
                                <Route path='/cart' component={Cart}/>
                                <Route path='/orders' component={UserOrders}/>
                                <Route path='/order/:id' component={OrderShow}/>
                                <Route path='/order_create' component={CreateOrder}/>
                                <Route path='/search' component={AdvancedSearch}/>
                                <Route path='/vin' component={VinSearch}/>
                                <Route component={NotFound}/>
                            </Switch>
                        </BrowserRouter>
                    </div>
                </div>
                <div className='footer'>Copyright &#169; GeekHub 2019</div>
            </div>
        )
    }
}

export default App
