import React, { Component } from 'react'
import { BrowserRouter, withRouter } from 'react-router-dom'
import API from '../api'
import UserDataModal from './UserDataModal'

class UserProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {},
        }
    }

    componentWillMount() {
        API.get(`users`)
            .then(function (response) {
                if (response.data) {
                    this.setState({
                        user: response.data
                    })
                }
            }.bind(this))
    }

    render() {
        return (
            <div className='user-profile'>
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
                    <div className=''>
                        <UserDataModal/>
                    </div>
                </BrowserRouter>
            </div>
        )
    }
}

export default withRouter(UserProfile)