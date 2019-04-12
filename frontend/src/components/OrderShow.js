import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import API from '../api'
import ReactTable from 'react-table'

import NotFound from './NotFound'
import PageUpload from './PageUpload'
import noPhoto from '../images/no_picture.gif'


class Page extends Component {
    constructor(props) {
        super(props)
        this.state = {
            order: {},
            //for check response data
            responseStatus: ''
        }
    }


    componentWillMount() {
            API.get(`orders/${this.props.match.params.id}`)
                .then(function (response) {
                    if(response.data) {
                        this.setState({
                            order: response.data,
                            responseStatus: 'true'
                        })
                    } else {
                        this.setState({ responseStatus: 'null' })
                    }
                    if (response.statusCode === 404) {
                        this.setState({ responseStatus: 'null' })
                    }
                }.bind(this), function (error) {
                    if (error.response.status === 404) {
                        this.setState({
                            order: {},
                            responseStatus: 'null'
                        })
                    }
                }.bind(this))
    }

    render() {
        let items = this.state.order.line_items.length
        return (
            <div>
                {(() => {
                    switch (this.state.responseStatus) {
                        case 'true':
                            return <div className='order'>
                                <table className='table table-striped table-bordered'>
                                    <tbody>
                                    <tr>
                                        <th>id</th>
                                        <td>{this.state.order.id}</td>
                                    </tr>
                                    <tr>
                                        <th>Статус</th>
                                        <td>{this.state.order.status}</td>
                                    </tr>
                                    <tr>
                                        <th>Вартість</th>
                                        <td>{this.state.order.total_price} грн</td>
                                    </tr>
                                    <tr>
                                        <th>Адрес доставки</th>
                                        <td>{this.state.order.address}</td>
                                    </tr>
                                    </tbody>
                                </table>
                                <ReactTable
                                    data={this.state.order.line_items}
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
                                            Header: 'Кількість',
                                            accessor: 'quantity',
                                            width: 120
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
                                        }
                                    ]}
                                    pageSize={(items < 10) ? items : 10}
                                    className='-striped -highlight'
                                />
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

export default withRouter(Page)
