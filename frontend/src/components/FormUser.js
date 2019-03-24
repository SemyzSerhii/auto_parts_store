import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import classNames from 'classnames/bind'
import PasswordMask from 'react-password-mask'
import update from 'immutability-helper'
import API from '../api'
import $ from 'jquery'

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
            validation: {
                name: '',
                email: '',
                password: ''
            },
            edit: false,
            success: false
        }

        this.dataChange = this.dataChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.checkField = this.checkField.bind(this)
        this.createUser = this.createUser.bind(this)
        this.editUser = this.editUser.bind(this)
        this.resetData = this.resetData.bind(this)
        this.validationForm = this.validationForm.bind(this)
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
        const user = this.state.user
        this.checkField()
        // check errors exist
        if (!this.state.errors.name &&
            !this.state.errors.email &&
            !this.state.errors.password) {
            if (!this.state.edit) {
                this.createUser(user)
            } else {
                this.editUser(user)
            }
        }
    }

    checkField() {
        var email = this.state.user.email

        if (this.state.user.name.length >= 3) {
            this.state.errors.name = false
            this.state.validation.name = ''
        } else {
            this.state.errors.name = true
            this.state.validation.name = 'Це поле обов`язкове. Довжина не менше 3 симовлів.'
        }

        if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
            this.state.errors.email = false
            this.state.validation.email = ''
        } else {
            this.state.errors.email = true
            this.state.validation.email = 'Це поле обов`язкове. Приклад, example@gmail.com'
        }

        if (this.state.user.password.length >= 6) {
            this.state.errors.password = false
            this.state.validation.password = ''
        } else {
            this.state.errors.password = true
            this.state.validation.password = 'Це поле обов`язкове. Довжина не менше 6 симовлів.'
        }
    }

    createUser(user) {
        const request = {"user": {"name": user.name, "email": user.email, "password": user.password}}
        $.ajax({
            url: "http://localhost:3000/api/v1/users",
            type: "POST",
            data: request,
            dataType: "json",
            context: this,
            success: function (res) {
                if (res) {
                    this.resetData()
                }
            },
            error: function (error) {
                this.validationForm(error)
            }

        })
    }

    editUser(user) {
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

    validationForm(error) {
        var name = error.responseJSON.name ? true : false
        var email = error.responseJSON.email ? true : false
        var password = error.responseJSON.password ? true : false

        this.setState({
            errors: {
                name: name,
                email: email,
                password: password

            },
            validation: {
                name: error.responseJSON.name,
                email: error.responseJSON.email
            }
        })
    }

    resetData() {
        this.setState({
            user: {
                name: '',
                email: '',
                password: ''
            },
            success: true
        })
    }

    render() {
        return (
            <div>
                <form className='user-form'>
                    <div className='form-group'>
                        <input
                            className={classNames('form-control',
                                `${this.state.errors.name ? 'error' : ''}`)}
                            name='name'
                            type='text'
                            placeholder='Name'
                            value={this.state.user.name}
                            onChange={this.dataChange}
                        />
                        <div className='text-danger'>
                            {this.state.validation.name}
                        </div>
                    </div>
                    <div className='form-group'>
                        <input
                            className={classNames('form-control',
                                `${this.state.errors.email ? 'error' : ''}`)}
                            name='email'
                            placeholder='Email'
                            value={this.state.user.email}
                            onChange={this.dataChange}
                        />
                        <div className='text-danger'>
                            {this.state.validation.email}
                        </div>
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
                        <div className='text-danger'>
                            {this.state.validation.password}
                        </div>
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
                                    'Реєстрація пройшла успішно. Ви можете ввійти в особистий кабінет!') :
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
