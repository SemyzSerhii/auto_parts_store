import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import API from '../api'
import Parser from 'html-react-parser'

import NotFound from './NotFound'
import PageUpload from './PageUpload'

import noPhoto from '../images/no_picture.gif'
import classNames from 'classnames/bind'


class Product extends Component {
    constructor(props) {
        super(props)
        this.state = {
            product: {},
            //for check response data
            responseStatus: '',
            buy: false
        }
        this.addProduct = this.addProduct.bind(this)
    }

    headerCart() {
        return localStorage.getItem('cart_token') ? {'Cart': localStorage.getItem('cart_token')} : {}
    }

    addProduct() {
        API.post('line_items', {product_id: this.state.product.id}, {headers: this.headerCart()})
            .then(res => {
                if(res.status === 201) {
                    if (res.data.cart_token) localStorage.setItem('cart_token', res.data.cart_token)
                    this.setState({
                        buy: true
                    })
                }
            })
    }

    componentWillMount() {
        let id = this.props.match.params.id
        API.get(`products/${id}`)
            .then(function (response) {
                if(response.data) {
                    this.setState({
                        product: response.data,
                        responseStatus: 'true'
                    })
                } else {
                    this.setState({
                        responseStatus: 'null'
                    })
                }
                if (response.statusCode === 404) {
                    this.setState({responseStatus: 'null'})
                }
            }.bind(this), function (error) {
                if (error.response.status === 404) {
                    this.setState({
                        page: {},
                        responseStatus: 'null'
                    })
                }
            }.bind(this))

        API.get('cart', {headers: this.headerCart()})
            .then(function (response) {
                if(response.data) {
                    if (response.data.line_items.find(
                        function (item) {
                            return item.product.id === parseInt(id)
                        })) {
                        this.setState({
                            buy: true
                        })
                    }
                    if (response.data.cart_token) localStorage.setItem('cart_token', response.data.cart_token)
                }
            }.bind(this))
    }

    render() {
        var rating = Math.round(this.state.product.rating)
        return (
            <div id='product'>
                {(() => {
                    switch (this.state.responseStatus) {
                        case 'true':
                            return <div className='product'>
                                <h1>
                                    {this.state.product.name}
                                    {this.state.product.brand ? ` ${this.state.product.brand}` : ''}
                                    {this.state.product.company ? ` / ${this.state.product.company}` : ''}
                                    {this.state.product.model ? ` / ${this.state.product.model}` : ''}
                                </h1>
                                <div className='product-data'>
                                    <div className='product-img'>
                                        <img
                                            // check if image not -> visible standard image
                                            className={this.state.product.image.url ? '' : 'no-image'}
                                            src={this.state.product.image.url ? this.state.product.image.url : noPhoto}
                                            alt={this.state.product.name}
                                        />
                                    </div>
                                    <div className='product-info'>
                                        <p className='price'>Ціна: {this.state.product.price} грн</p>
                                        <ul className="rating"
                                            data-index={this.state.product.rating ? rating : 0}>
                                            <li className={classNames('fa', 'fa-star',
                                                `${rating === 0 ? 'disable' : ''}`)}></li>
                                            <li className={classNames('fa', 'fa-star',
                                                `${rating <= 1 ? 'disable' : ''}`)}></li>
                                            <li className={classNames('fa', 'fa-star',
                                                `${rating <= 2 ? ' disable' : ''}`)}></li>
                                            <li className={classNames('fa', 'fa-star',
                                                `${rating <= 3 ? 'disable' : ''}`)}></li>
                                            <li className={classNames('fa', 'fa-star',
                                                `${rating <= 4 ? 'disable' : ''}`)}></li>
                                        </ul>
                                        {this.state.buy ?
                                            (<a href='/cart' className='link-cart'>
                                                <i className="fa fa-cart-plus" aria-hidden="true"></i> Уже в корзині
                                            </a>) :
                                            (<button onClick={() => {this.addProduct()}}
                                                     type="button" className="buy btn btn-primary">
                                                <i className="fa fa-shopping-cart"></i> В корзину
                                            </button>)
                                        }
                                            <button type="button" className="btn btn-primary">
                                                <i className="fa fa-heart"></i> В список бажань
                                            </button>

                                        {this.state.product.full_description ?
                                            Parser(this.state.product.full_description) : ''}
                                    </div>
                                </div>
                            </div>
                        case 'null':
                            return <NotFound/>
                        default:
                            return <PageUpload/>
                    }
                })()}
            </div>
        )
    }
}

export default withRouter(Product)
