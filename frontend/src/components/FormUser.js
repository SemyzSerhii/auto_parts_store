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
                name: '',
                email: '',
                password: '',
                phone: ''
            },
            edit: false,
            success: false,
            current_user: ''
        }

        this.dataChange = this.dataChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.checkField = this.checkField.bind(this)
        this.createUser = this.createUser.bind(this)
        this.editUser = this.editUser.bind(this)
        this.resetData = this.resetData.bind(this)
        this.validationForm = this.validationForm.bind(this)
    }

    componentWillMount() {
        // if edit get data
        if (this.state.current_user){
            API.get(`users`)
                .then(function (response) {
                    this.setState({
                        user: response.data,
                        edit: true
                    })

                }.bind(this))
        }
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
            }
        })
        let error_count = this.checkField()

        const user = this.state.user
        // check errors exist
        if (error_count === 0) {
            if (!this.state.current_user) {
                this.createUser(user)
            } else {
                this.editUser(user)
            }
        }
    }

    checkField() {
        var error_email, error_name, error_phone, error_password
        var error = 0

        if (this.state.user.name.length >= 3) {
            error_name = ''
        } else {
            error_name = 'Довжина не менше 3 симовлів.'
            error++
        }

        if (EMAIL_VALIDATION.test(this.state.user.email)) {
            error_email = ''
        } else {
            error_email = 'Приклад, example@gmail.com'
            error++
        }

        if (this.state.user.password.length >= 6) {
            error_password = ''
        } else {
            error_password = 'Довжина не менше 6 симовлів.'
            error++
        }

        if (PHONE_VALIDATION.test(this.state.user.phone)) {
            error_phone = ''
        } else {
            error_phone = 'Не вірний номер.'
            error++
        }
        this.setState({
            errors: {
                name: error_name,
                email: error_email,
                password: error_password,
                phone: error_phone
            }
        })

        return error
    }

    createUser(user) {
        const request = {
            'user': {
                'name': user.name,
                'email': user.email,
                'phone': user.phone,
                'password': user.password
            }
        }
        $.ajax({
            url: `${URL_API}/users`,
            type: 'POST',
            data: request,
            dataType: 'json',
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
        const request = {
            'user': {
                'name': user.name,
                'email': user.email,
                'phone': user.phone,
                'password': user.password
            }
        }
        $.ajax({
            url: `${URL_API}/users`,
            type: 'PUT',
            data: request,
            dataType: 'json',
            context: this,
            success: function (res) {
                if (res) {
                    this.setState({success: true})
                }
            },
            error: function (error) {
                this.validationForm(error)
            }

        })
    }

    validationForm(error) {
        this.setState({
            errors: {
                name: error.responseJSON.name,
                email: error.responseJSON.email,
                phone:  error.responseJSON.phone,
                password: error.responseJSON.password
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
                            {this.state.errors.name}
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
                            {this.state.errors.email}
                        </div>
                    </div>

                    <div className='form-group'>
                        <label htmlFor='phone'>+380</label>
                        <input
                            className={classNames('form-control', 'phone',
                                `${this.state.errors.phone ? 'error' : ''}`)}
                            name='phone'
                            placeholder='Phone'
                            value={this.state.user.phone}
                            onChange={this.dataChange}
                        />
                        <div className='text-danger'>
                            {this.state.errors.phone}
                        </div>
                    </div>

                    <div className='form-group password'>
                        <PasswordMask
                            id='password'
                            name='password'
                            className='input-group'
                            inputClassName={classNames('form-control',
                                `${this.state.errors.password ? 'error' : ''}`)}
                            buttonClassName='btn btn-outline-primary'
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
                            value='Зберегти'
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
