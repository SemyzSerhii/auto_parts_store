import React, { Component } from 'react'
import './App.css'
import Home from './components/Home'
import Page from './components/Page'
import Menu from './components/Menu'
import NotFound from './components/NotFound'
import { BrowserRouter, Switch, Route } from 'react-router-dom'



class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <h1>Auto Parts Store</h1>
                    <Menu/>
                </div>
                <div className='routes'>
                    <BrowserRouter>
                        <Switch>
                            <Route exact path='/' component={Home}/>
                            <Route path='/pages/:id' component={Page}/>
                            <Route component={NotFound}/>
                        </Switch>
                    </BrowserRouter>
                </div>
                <div className='footer'>Copyright &#169; GeekHub 2019</div>
            </div>
    );
    }
}

export default App
