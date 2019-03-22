import React, { Component } from 'react'
import { BrowserRouter, withRouter } from 'react-router-dom'
import classNames from 'classnames/bind'
import PasswordMask from 'react-password-mask'
import update from 'immutability-helper'
import API from '../api'
import Login from './Login'

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
                name: false,
                email: false,
                password: false
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
            this.state.errors.name = true
        } else {
            this.state.errors.name = false
        }
        if (!this.state.user.email) {
            this.state.errors.email = true
        } else {
            this.state.errors.email = false
        }
        if (!this.state.user.password) {
            this.state.errors.password = true
        } else {
            this.state.errors.password = false
        }
        console.log (this.state.errors.name)
        const user = this.state.user
        // check errors exist
        if (this.state.errors.name ||
            this.state.errors.email ||
            this.state.errors.password){
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
                        if (error.response.data.name.length > 0) {
                            this.state.errors.name = true
                        }
                        if (error.response.data.email.length > 0) {
                            this.state.errors.email = true
                        }
                        if (error.response.data.password.length > 0) {
                            this.state.errors.password = true
                        }
                    })
                // resetting data
                if (this.state.errors.name ||
                    this.state.errors.email ||
                    this.state.errors.password) {
                    this.state.success = false
                } else {
                    this.setState({
                        user: {
                            name: '',
                            email: '',
                            password: ''
                        },
                        success: true
                    })
                }
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
                    },
                    success: true
                })
            }
        }
    }

    render() {
        return (
            <div>
                <form className='user-form'>
                    <div className='form-group'>
                        <input
                            className={classNames('form-control', `${this.state.errors.name ? 'error' : ''}`)}
                            name='name'
                            type='text'
                            placeholder='Name'
                            value={this.state.user.name}
                            onChange={this.dataChange}
                        />
                    </div>
                    <div className='form-group'>
                        <input
                            className={classNames('form-control', `${this.state.errors.email ? 'error' : ''}`)}
                            name='email'
                            placeholder='Email'
                            value={this.state.user.email}
                            onChange={this.dataChange}
                        />
                    </div>

                    <div className='form-group password'>
                        <PasswordMask
                            id="password"
                            name="password"
                            className='input-group'
                            inputClassName={classNames('form-control',
                                `${this.state.errors.password ? 'error' : ''}`)}
                            buttonClassName="btn btn-outline-primary"
                            placeholder="Enter password"
                            value={this.state.user.password}
                            onChange={this.dataChange}
                        />
                    </div>

                    <div className='form-group text-center'>
                        <input
                            className='btn btn-primary'
                            type='submit'
                            value='Реєстрація'
                            onClick={this.handleSubmit}
                        />
                        <div className='text-success'>
                            {this.state.success ?
                                (this.state.edit ?
                                    'Дані змінено!' :
                                    (<p>'Реєстрація пройшла успішно. Ви можете ввійти в особистий кабінет!</p>)) :
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
