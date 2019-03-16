import React, { Component } from 'react'
import API from '../api'

class ProductsList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products: []
        }
    }

    componentDidMount() {
        API.get('/products')
            .then(response => {
                console.log(response)
                this.setState({products: response.data})
            })
            .catch(error => console.log(error))
    }

    render() {
        return (
            <div className="products">
                {this.state.products.map((product) => {
                    return(
                        <div className="product" key={product.id} >
                            <p>{product.model}</p>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default ProductsList
