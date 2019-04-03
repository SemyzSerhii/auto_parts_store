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
    }

    deleteProduct(id) {
        API.delete(`line_items/${id}`)
            .then(function () {
                window.location.reload()
            })
    }

    cleanCart() {
        API.delete('cart')
            .then(function () {
                window.location.reload()
            })
    }

    componentWillMount() {
        API.get('cart')
            .then(function (response) {
                if(response.data) {
                    this.setState({
                        cart: response.data,
                        responseStatus: 'true'
                    })
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
                                                    )}>{row.value.name}</button>
                                            )

                                        },
                                        {
                                            Header: 'Image',
                                            accessor: 'product',
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
                                            Header: 'Кількість',
                                            accessor: 'quantity'
                                        },
                                        {
                                            Header: 'Ціна',
                                            accessor: 'product.price'
                                        },
                                        {
                                            Header: 'Разом',
                                            accessor: 'product',
                                            Cell: row => (row.original.quantity * row.value.price)
                                        },
                                        {
                                            Header: '',
                                            Cell: row => (
                                                <button className='btn btn-primary'
                                                   onClick={() => {
                                                       this.deleteProduct(row.original.id)
                                                   }
                                                   }>
                                                    Удалить
                                                </button>
                                            ),
                                        }
                                ]}
                        pageSize={(items < 10) ? items : 10}
                        className='-striped -highlight'
                            />
                                {this.state.cart.length > 0 ?
                                    (<div><h5>Загальна вартість: {sum}</h5>
                                        <div className='row buttons'>
                                            <button className="btn btn-primary" onClick={this.cleanCart}>Очистити
                                            </button>
                                            <a className="btn btn-primary" href='/order'>Оформити замовлення</a>
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
