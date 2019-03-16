import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import update from 'immutability-helper'
import API from '../api'

class FormUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {
                name: '',
                email: '',
                password: '',
                _id: ''
            },
            errors: {
                name: '',
                email: '',
                password: ''
            },
            edit: false,
            success: false
        }

        this.dataChange = this.dataChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    dataChange({target: {value, name}}) {
        this.setState({
            user: update(this.state.user, {
                [name]: {$set: value}
            })
        })
    }


    handleSubmit(event) {
        event.preventDefault()
        this.setState({
            user: {
                name: this.state.user.name,
                email: this.state.user.email,
                password: this.state.user.password,
                _id: this.state.user._id
            },
            success: false
        })
        // check if 'name' is empty write error
        if (!this.state.user.name) {
            this.state.errors.name = 'Name is required'
        } else {
            this.state.errors.name = ''
        }
        // check if 'email' is empty write error
        if (!this.state.user.email) {
            this.state.errors.email = 'Email is required'
        } else {
            this.state.errors.email = ''
        }

        // check if 'email' is empty write error
        if (!this.state.user.password) {
            this.state.errors.password = 'Password is required'
        } else {
            this.state.errors.password = ''
        }

        const user = this.state.user
        // check errors exist
        if (this.state.errors.name ||
            this.state.errors.email ||
            this.state.errors.password) {
            this.state.success = false
        } else {
            // check add or edit user
            if (!this.state.edit) {
                API.post('/users', {
                    name: user.name,
                    email: user.email,
                    password: user.password
                })
                    .catch(function (error) {
                        console.log(error)
                    })
                this.state.success = true
            } else {
                API.put(`/users/${this.state.user._id}`,
                    {
                        name: user.name,
                        email: user.email,
                        password: user.password
                    })
                    .catch(errors => console.log(errors))
                this.setState({
                    user: {
                        name: user.name,
                        email: user.email,
                        password: user.password
                    }
                })
                this.state.success = true
            }
        }
    }

    render() {
        return (
            <div>
                <form className='user-form'>
                    <div className='form-group'>
                        <input
                            className='required form-control'
                            name='name'
                            type='text'
                            placeholder='Name'
                            value={this.state.user.name}
                            onChange={this.dataChange}
                        />
                        <div className='text-danger'>
                            {this.state.errors.name}
                        </div>
                    </div>
                    <div className='form-group'>
                        <input
                            className='required form-control'
                            name='email'
                            placeholder='Email'
                            value={this.state.user.email}
                            onChange={this.dataChange}
                        />
                        <div className='text-danger'>
                            {this.state.errors.email}
                        </div>
                    </div>

                    <div className='form-group'>
                        <input
                            className='required form-control'
                            name='password'
                            placeholder='Password'
                            value={this.state.user.password}
                            onChange={this.dataChange}
                        />
                        <div className='text-danger'>
                            {this.state.errors.password}
                        </div>
                    </div>

                    <div className='form-group text-center'>
                        <input
                            className='btn btn-primary'
                            type='submit'
                            value='Save'
                            onClick={this.handleSubmit}
                        />
                        <div className='text-success'>
                            {this.state.success ?
                                (this.state.edit ?
                                    'User edited!' :
                                    'User created!') :
                                ''
                            }
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default withRouter(FormUser)
