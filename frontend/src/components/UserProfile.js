import React, { Component } from 'react'
import { BrowserRouter, withRouter } from 'react-router-dom'
import API from '../api'
import UserDataModal from './UserDataModal'
import NotFound from './NotFound'

class UserProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {},
        }
    }

    componentWillMount() {
        API.get(`users`, {
            headers: {'Authorization': localStorage.getItem('auth_token')}
        })
            .then(function (response) {
                if (response.data) {
                    this.setState({
                        user: response.data
                    })
                }
            }.bind(this))
    }

    render() {
        if (this.state.user.name) {
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
                            <UserDataModal user={this.state.user}/>
                        </div>
                    </BrowserRouter>
                </div>
            )
        } else {
            return <NotFound/>
        }
    }
}

export default withRouter(UserProfile)
