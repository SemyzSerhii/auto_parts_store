import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

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
                <ProductsList/>
            </div>
        )
    }
}

export default withRouter(Home)
