import React, { Component } from 'react'
import { BrowserRouter, withRouter } from 'react-router-dom'
import API from '../api'
import UserDataModal from './UserDataModal'
import NotFound from './NotFound'
import PageUpload from './PageUpload'

class UserProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {},
            responseStatus: ''
        }
    }

    componentWillMount() {
        if (localStorage.getItem('auth_token')) {
            API.get(`users`, {
                headers: {'Authorization': localStorage.getItem('auth_token')}
            })
                .then(function (response) {
                    if (response.data) {
                        this.setState({
                            user: response.data,
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
                            user: {},
                            responseStatus: 'null'
                        })
                    }
                }.bind(this))
        } else {
            this.setState({
                responseStatus: 'null'
            })
        }

    }

    render() {
        return (
            <div>
                {(() => {
                    switch (this.state.responseStatus) {
                        case 'true':
                            return (<div className='user-profile'>
                                {this.state.user.name ? (
                                    <div>
                                        <table className='table table-striped table-bordered'>
                                            <tbody>
                                            <tr>
                                                <th>Name</th>
                                                <td>{this.state.user.name}</td>
                                            </tr>
                                            <tr>
                                                <th>Email</th>
                                                <td>{this.state.user.email}</td>
                                            </tr>
                                            <tr>
                                                <th>Phone</th>
                                                <td>+380{this.state.user.phone}</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        <BrowserRouter>
                                            <UserDataModal user={this.state.user}/>
                                        </BrowserRouter>
                                    </div>
                                    ) : ('')
                                }</div>)
                case
                    'null':
                    return <NotFound/>
                default:
                    return <PageUpload/>
                }
                })()}
                </div>
            )
    }
}

export default withRouter(UserProfile)
