import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import API from '../api'
import ReactTable from 'react-table'
import 'react-table/react-table.css'

import NotFound from './NotFound'
import PageUpload from './PageUpload'
import noPhoto from '../images/no_picture.gif'


class Cart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cart: [],
            //for check response data
            responseStatus: ''
        }
        this.deleteProduct = this.deleteProduct.bind(this)
        this.cleanCart = this.cleanCart.bind(this)
        this.changeQuantity = this.changeQuantity.bind(this)
    }

    headerCart() {
        return localStorage.getItem('cart_token') ? {'Cart': localStorage.getItem('cart_token')} : {}
    }

    deleteProduct(id) {
        API.delete(`line_items/${id}`, {headers: this.headerCart()})
            .then(function () {
                window.location.reload()
            })
    }

    changeQuantity(id, quantity, change) {
        let new_quantity = change ? quantity + 1 : quantity - 1
        if (new_quantity === 0) {
            this.deleteProduct(id)
        } else {
            API.put(`line_items/${id}`, {quantity: new_quantity}, {headers: this.headerCart()})
                .then(function () {
                    window.location.reload()
                })
        }
    }

    cleanCart() {
        API.delete('cart', {headers: this.headerCart()})
            .then(function () {
                localStorage.removeItem('cart_token')
                window.location.reload()
            })
    }

    componentWillMount() {
        API.get('cart', {headers: this.headerCart()})
            .then(function (response) {
                if(response.data) {
                    this.setState({
                        cart: response.data.line_items,
                        responseStatus: 'true'
                    })
                    if (response.data.cart_token) localStorage.setItem('cart_token', response.data.cart_token)
                } else {
                    this.setState({ responseStatus: 'null' })
                }
                if (response.statusCode === 404) {
                    this.setState({ responseStatus: 'null' })
                }
            }.bind(this), function () {
                this.setState({
                    cart: [],
                    responseStatus: 'null'
                })
            }.bind(this))
    }

    render() {
        let sum = 0
        let items = this.state.cart.length
        for (let i = 0; i < items; i++) {
            sum += this.state.cart[i.toString()].quantity * this.state.cart[i.toString()].product.price
        }
        return (
            <div>
                {(() => {
                    switch (this.state.responseStatus) {
                        case 'true':
                            return <div className='cart'><ReactTable
                                data={this.state.cart}
                                columns={[
                                    {
                                        Header: 'Назва',
                                        accessor: 'product',
                                        Cell: row => (
                                            <button
                                                className='nav-link btn btn-link'
                                                onClick={() => this.props.history.push(
                                                    `/products/${row.value.id}`
                                                )}>{row.value.name}
                                                {row.value.model ? ` / ${row.value.model}` : ''}
                                                {row.value.company ? ` / ${row.value.company}` : ''}
                                                {row.value.brand ? ` / ${row.value.brand}` : ''}</button>
                                        )

                                    },
                                    {
                                        Header: '',
                                        accessor: 'product',
                                        width: 120,
                                        Cell: row => (
                                            <img
                                                width='75px'
                                                // check if image not -> visible standard image
                                                src={row.value.image.url ? row.value.image.url : noPhoto}
                                                alt={row.value.name}
                                            />
                                        )
                                    },
                                    {
                                        Header: '',
                                        width: 30,
                                        Cell: row => (
                                            <button className='btn btn-link padding-0'
                                                    onClick={() => {
                                                        this.changeQuantity(row.original.id, row.original.quantity, true)
                                                    }
                                                    }>
                                                <i className='fa fa-plus'></i>
                                            </button>
                                        ),
                                    },
                                    {
                                        Header: 'Кількість',
                                        accessor: 'quantity',
                                        width: 120
                                    },
                                    {
                                        Header: '',
                                        width: 30,
                                        Cell: row => (
                                            <button className='btn btn-link padding-0'
                                                    onClick={() => {
                                                        this.changeQuantity(row.original.id, row.original.quantity, false)
                                                    }
                                                    }>
                                                <i className='fa fa-minus'></i>
                                            </button>
                                        ),
                                    },
                                    {
                                        Header: 'Ціна',
                                        accessor: 'product.price',
                                        width: 120,
                                        Cell: row => (`${row.value} грн`)
                                    },
                                    {
                                        Header: 'Разом',
                                        accessor: 'product',
                                        width: 120,
                                        Cell: row => (`${row.original.quantity * row.value.price} грн`)
                                    },
                                    {
                                        Header: '',
                                        width: 30,
                                        Cell: row => (
                                            <button className='btn btn-link padding-0'
                                                    onClick={() => {
                                                        this.deleteProduct(row.original.id)
                                                    }
                                                    }>
                                                <i className='fa fa-times'></i>
                                            </button>
                                        ),
                                    }
                                ]}
                                pageSize={(items < 10) ? items : 10}
                                className='-striped -highlight'
                            />
                                {this.state.cart.length > 0 ?
                                    (<div className='total-price'><h5>Загальна вартість: {sum} грн</h5>
                                        <div className='row buttons'>
                                            <button className='btn btn-primary' onClick={this.cleanCart}>Очистити
                                            </button>
                                            <a className='btn btn-primary' href='/order_create'>Оформити замовлення</a>
                                        </div>
                                    </div>) : ''
                                }
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

export default withRouter(Cart)
