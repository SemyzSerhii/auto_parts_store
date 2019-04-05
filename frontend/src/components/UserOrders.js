import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Moment from 'react-moment'
import API from '../api'
import ReactTable from 'react-table'

class UserOrders extends Component {
    constructor(props) {
        super(props)
        this.state = {
            orders: []
        }
    }

    componentWillMount() {
        API.get('orders')
            .then(function (response) {
                if (response.data) {
                    this.setState({
                        orders: response.data
                    })
                }
            }.bind(this))
    }

    render() {
        let items = this.state.orders.length
        return (
            <div className='orders'><ReactTable
                data={this.state.orders}
                columns={[
                    {
                        Header: 'id',
                        accessor: 'id'

                    },
                    {
                        Header: 'Дата',
                        accessor: 'created_at',
                        Cell: row => (<Moment format="DD.MM.YYYY">{row.value}</Moment>)
                    },
                    {
                        Header: 'Статус',
                        accessor: 'status',
                    },
                    {
                        Header: 'Вартість',
                        accessor: 'total_price',
                    },
                    {
                        Header: '',
                        Cell: row => (
                            <button
                                className='nav-link btn btn-link'
                                onClick={() => this.props.history.push(
                                    `/orders/${row.original.id}`
                                )}><i className="fa fa-eye" aria-hidden="true"></i></button>
                        )
                    }
                ]}
                pageSize={(items < 10) ? items : 10}
                className='-striped -highlight'
            />
            </div>
        )
    }
}
export default withRouter(UserOrders)
