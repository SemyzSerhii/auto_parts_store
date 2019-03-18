import React, { Component } from 'react'
import API from '../api'
import Parser from 'html-react-parser'
import noPhoto from '../images/no_picture.gif'

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
            <div className="products row">
                {this.state.products.map((product) => {
                    return(
                        <div className="col-md-3 col-sm-6" key={product.id}>
                            <div className="product">
                                <div className="product-image">
                                    <a href={`/products/${product.id}`}>
                                        <img
                                            // check if image not -> visible standard image
                                            className={product.image ? '' : 'no-image'}
                                            src={product.image ? product.image : noPhoto}
                                            alt={product.name}
                                        />
                                    </a>
                                    <ul className="social">
                                        <li><a href={`/products/${product.id}`}
                                               data-tip="Переглянути">
                                            <i className="fa fa-eye"></i>
                                        </a></li>
                                        <li>
                                            <a href="#" data-tip="В список бажань">
                                                <i className="fa fa-heart"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" data-tip="В корзину">
                                                <i className="fa fa-shopping-cart"></i>
                                            </a>
                                        </li>
                                    </ul>
                                    <a className="add-to-cart" href="">Купити</a>
                                </div>
                                <div className="product-content">
                                    <a
                                        className='title'
                                        key={product.id}
                                        href={`/products/${product.id}`}
                                    >{product.name} {product.model} {product.mark ? ` / ${product.mark}` : ''}
                                    </a>

                                    <div>Ціна: {product.price}</div>
                                    <div>{product.company ? `Виробник: ${product.company}` : ''}</div>
                                    <div className='short-description'>{Parser(product.short_description)}</div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default ProductsList
