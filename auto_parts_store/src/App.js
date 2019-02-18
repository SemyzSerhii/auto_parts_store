import React, { Component } from 'react'
import './App.css'
import UsersContainer from './components/Users'

class App extends Component {
    render() {
        return (
            <div className="App">
            <div className="App-header">
            <h1>Auto Parts Store</h1>
        </div>
        <UsersContainer />
        </div>
    );
    }
}

export default App
