import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import classNames from 'classnames/bind'
import PasswordMask from 'react-password-mask'
import update from 'immutability-helper'
import API from '../api'
import $ from 'jquery'
import { URL_API, EMAIL_VALIDATION, PHONE_VALIDATION } from '../constants'

class FormUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {
                name: '',
                email: '',
                password: '',
                phone: '',
                _id: ''
            },
            errors: {
                name: false,
                email: false,
                password: false,
                phone: false
            },
            validation: {
                name: '',
                email: '',
                password: '',
                phone: ''
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
                phone: this.state.user.phone,
                _id: this.state.user._id
            },
            success: false
        })
        const user = this.state.user
        this.checkField()
        // check errors exist
        if (!this.state.errors.name && !this.state.errors.email &&
            !this.state.errors.password && !this.state.errors.phone) {
            if (!this.state.edit) {
                this.createUser(user)
            } else {
                this.editUser(user)
            }
        }
    }

    checkField() {
        var email, error_email, name, error_name, phone, error_phone, password, error_password

        if (this.state.user.name.length >= 3) {
            name = false
            error_name = ''
        } else {
            name = true
            error_name = 'Довжина не менше 3 симовлів.'
        }

        if (EMAIL_VALIDATION.test(this.state.user.email)) {
            email = false
            error_email = ''
        } else {
            email = true
            error_email = 'Приклад, example@gmail.com'
        }

        if (this.state.user.password.length >= 6) {
            password = false
            error_password = ''
        } else {
            password = true
            error_password = 'Довжина не менше 6 симовлів.'
        }

        if (PHONE_VALIDATION.test(this.state.user.phone)) {
            phone = false
            error_phone = ''
        } else {
            phone = true
            error_phone = 'Не вірний номер.'
        }

        this.state.errors.name = name
        this.state.errors.email = email
        this.state.errors.phone = phone
        this.state.errors.password = password

        this.state.validation.name = error_name
        this.state.validation.email = error_email
        this.state.validation.phone = error_phone
        this.state.validation.password = error_password
    }

    createUser(user) {
        const request = {
            "user": {
                "name": user.name,
                "email": user.email,
                "phone": user.phone,
                "password": user.password
            }
        }
        $.ajax({
            url: `${URL_API}/users`,
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
                password: user.password,
                phone: user.phone
            })
            .catch(errors => console.log(errors))
        this.setState({
            user: {
                name: user.name,
                email: user.email,
                password: user.password,
                phone: user.phone
            },
            success: true
        })
    }

    validationForm(error) {
        var name = error.responseJSON.name ? true : false
        var email = error.responseJSON.email ? true : false
        var password = error.responseJSON.password ? true : false
        var phone = error.responseJSON.phone ? true : false

        this.setState({
            errors: {
                name: name,
                email: email,
                password: password,
                phone: phone
            },
            validation: {
                name: error.responseJSON.name,
                email: error.responseJSON.email,
                phone:  error.responseJSON.phone
            }
        })
    }

    resetData() {
        this.setState({
            user: {
                name: '',
                email: '',
                password: '',
                phone: ''
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

                    <div className='form-group'>
                        <label htmlFor="phone">+380</label>
                        <input
                            className={classNames('form-control', 'phone',
                                `${this.state.errors.phone ? 'error' : ''}`)}
                            name='phone'
                            placeholder='Phone'
                            value={this.state.user.phone}
                            onChange={this.dataChange}
                        />
                        <div className='text-danger'>
                            {this.state.validation.phone}
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
                            placeholder="Password"
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
