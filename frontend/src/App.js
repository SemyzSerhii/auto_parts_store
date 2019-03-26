import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import '../node_modules/font-awesome/css/font-awesome.min.css'

import Home from './components/Home'
import Page from './components/Page'
import Product from './components/Product'
import CategoriesList from './components/CategoriesList'
import Menu from './components/Menu'
import NotFound from './components/NotFound'

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="header">
                    <Menu/>
                </div>
                <div className='container'>
                    <div className='row'>
                        <CategoriesList/>
                        <div className='col container'>
                            <BrowserRouter>
                                <Switch>
                                    <Route exact path='/' component={Home}/>
                                    <Route path='/pages/:id' component={Page}/>
                                    <Route path='/products/:id' component={Product}/>
                                    <Route path='/categories/:id' component={Home}/>
                                    <Route component={NotFound}/>
                                </Switch>
                            </BrowserRouter>
                        </div>
                    </div>
                </div>
                <div className='footer'>Copyright &#169; GeekHub 2019</div>
            </div>
        )
    }
}

export default App
