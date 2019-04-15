import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import classNames from 'classnames/bind'
import update from 'immutability-helper'
import $ from 'jquery'
import {EMAIL_VALIDATION, PHONE_VALIDATION, URL_API} from '../constants'

class CreateOrder extends Component {
    constructor(props) {
        super(props)
        this.state = {
            order: {
                name: '',
                email: '',
                phone: '',
                address: ''
            },
            errors: {
                name: '',
                email: '',
                address: '',
                phone: ''
            },
            success: false
        }

        this.dataChange = this.dataChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.checkField = this.checkField.bind(this)
        this.createOrder = this.createOrder.bind(this)
        this.resetData = this.resetData.bind(this)
        this.validationForm = this.validationForm.bind(this)
    }

    dataChange({target: {value, name}}) {
        this.setState({
            order: update(this.state.order, {
                [name]: {$set: value}
            })
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        this.setState({
            order: {
                name: this.state.order.name,
                email: this.state.order.email,
                address: this.state.order.address,
                phone: this.state.order.phone
            }
        })
        let error_count = this.checkField(localStorage.getItem('auth_token'))
        const order = this.state.order
        // check errors exist
        if (error_count === 0) {
            this.createOrder(order)
        }
    }

    checkField(current_user) {
        var error_email, error_name, error_phone, error_address
        var error = 0

        if (!current_user) {
            if (this.state.order.name.length >= 3) {
                error_name = ''
            } else {
                error_name = 'Довжина не менше 3 симовлів.'
                error++
            }

            if (EMAIL_VALIDATION.test(this.state.order.email)) {
                error_email = ''
            } else {
                error_email = 'Приклад, example@gmail.com'
                error++
            }

            if (PHONE_VALIDATION.test(this.state.order.phone)) {
                error_phone = ''
            } else {
                error_phone = 'Не вірний номер.'
                error++
            }
        }

        if (this.state.order.address.length >= 6) {
            error_address = ''
        } else {
            error_address = 'Введіть будь ласка повну адресу доставки.'
            error++
        }

        this.setState({
            errors: {
                name: error_name,
                email: error_email,
                address: error_address,
                phone: error_phone
            }
        })

        return error
    }

    createOrder(order) {
        const request = this.getReq(order)
        const headers = this.getHeaders()
        $.ajax({
            url: `${URL_API}/orders`,
            type: 'POST',
            data: request,
            dataType: 'json',
            headers: headers,
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

    getHeaders() {
        let headers = {}
        if (localStorage.getItem('auth_token')) headers['Authorization'] = localStorage.getItem('auth_token')
        if (localStorage.getItem('cart_token')) headers['Cart'] = localStorage.getItem('cart_token')
        return headers
    }

    getReq(order) {
        if (localStorage.getItem('auth_token')) {
            return {
                order: {
                    address: order.address
                }
            }
        } else {
            return {
                order: {
                    address: order.address,
                    phone: order.phone
                },
                user: {
                    name: order.name,
                    email: order.email
                }
            }
        }
    }

    validationForm(error) {
        let auth_error = error.responseJSON.messages.exception ? 'Ввійдіть будь ласка в свій акуан і повторіть спробу' : ''
        let address_error = error.responseJSON.messages.orders ? 'Введіть будь ласка повну адресу доставки.' : ''
        if(error.responseJSON) {
            this.setState({
                errors: {
                    name: error.responseJSON.messages.name,
                    email: error.responseJSON.messages.email,
                    phone:  error.responseJSON.messages.phone,
                    address: error.responseJSON.messages.address || address_error,
                    other_error: auth_error
                }
            })
        } else {
            this.setState({
                errors: {
                    other_error: error.responseText
                }
            })
        }

    }

    resetData() {
        this.setState({
            order: {
                name: '',
                email: '',
                address: '',
                phone: ''
            },
            success: true
        })
    }

    render() {
        if (!this.state.success) {
            return (<form className='order-form'>
                {!localStorage.getItem('auth_token') ? (
                    <div>
                        <div className='form-group'>
                            <input
                                className={classNames('form-control',
                                    `${this.state.errors.name ? 'error' : ''}`)}
                                name='name'
                                type='text'
                                placeholder='Name'
                                value={this.state.order.name}
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
                                value={this.state.order.email}
                                onChange={this.dataChange}
                            />
                            <div className='text-danger'>
                                {this.state.errors.email}
                            </div>
                        </div>

                        <div className='form-group phone'>
                            <label htmlFor='phone'>+380</label>
                            <input
                                className={classNames('form-control',
                                    `${this.state.errors.phone ? 'error' : ''}`)}
                                name='phone'
                                placeholder='Phone'
                                value={this.state.order.phone}
                                onChange={this.dataChange}
                            />
                            <div className='text-danger'>
                                {this.state.errors.phone}
                            </div>
                        </div>
                    </div>
                ) : ('')}
                <div className='form-group'>
                        <textarea
                            className={classNames('form-control',
                                `${this.state.errors.address ? 'error' : ''}`)}
                            name='address'
                            placeholder='Address'
                            value={this.state.order.address}
                            onChange={this.dataChange}
                        />
                    <div className='text-danger'>
                        {this.state.errors.address}
                    </div>
                    <div className='text-danger'>
                        {this.state.errors.other_error}
                    </div>
                </div>

                <div className='form-group text-center'>
                    <input
                        className='btn btn-primary'
                        type='submit'
                        value='Оформити замолення'
                        onClick={this.handleSubmit}
                    />
                </div>
            </form>)
        } else {
            return <div className='text-success'>Замовлення оформлено, даталі на Вашому email!</div>
        }
    }
}

export default withRouter(CreateOrder)
