import React, { Component } from 'react'
import API from '../api'
import {withRouter} from 'react-router-dom'
import FormUser from './FormUser'
import ProductsList from './ProductsList'

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products: []
        }
    }

    render() {
        return (
            <div>
                <FormUser/>
                <ProductsList/>
            </div>
        )
    }
}

export default withRouter(Home)
