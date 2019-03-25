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
            responseStatus: ''
        }
    }


    componentWillMount() {
        API.get(`products/${this.props.match.params.id}`)
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
            }.bind(this))

            .catch(function (error) {
                    console.log('error ' + error)
                }
            )
    }

    render() {
        var rating = Math.round(this.state.product.rating)
        return (
            <div>
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
                                        <p className='price'>Ціна: {this.state.product.price}</p>
                                        <ul className="rating"
                                            data-index={this.state.product.rating ? rating : 0 }>
                                            <li className={classNames('fa','fa-star', `${rating === 0 ? 'disable' : ''}`)}></li>
                                            <li className={classNames('fa','fa-star', `${rating <= 1 ? 'disable' : ''}`)}></li>
                                            <li className={classNames('fa','fa-star', `${rating <= 2 ?' disable' : ''}`)}></li>
                                            <li className={classNames('fa','fa-star', `${rating <= 3 ? 'disable' : ''}`)}></li>
                                            <li className={classNames('fa','fa-star', `${rating <= 4 ? 'disable' : ''}`)}></li>
                                        </ul>
                                        <button type="button" className="buy btn btn-primary">
                                            <i className="fa fa-shopping-cart"></i> В корзину
                                        </button>
                                        <button type="button" className="btn btn-primary">
                                            <i className="fa fa-heart"></i> В список бажань
                                        </button>
                                        {Parser(this.state.product.full_description)}
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
