import React, { Component } from 'react'
import classNames from 'classnames/bind'
import Modal from 'react-modal'
import { withRouter } from 'react-router-dom'
import update from 'immutability-helper'
import $ from 'jquery'
import {EMAIL_VALIDATION, URL_API} from '../constants'

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
    }
}

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root')

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {
                email: '',
                password: ''
            },
            errors: {
                email: '',
                password: ''
            },
            success: false,
            modalIsOpen: false
        }
        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.dataChange = this.dataChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.checkField = this.checkField.bind(this)
    }

    openModal() {
        this.setState({modalIsOpen: true})
    }

    closeModal() {
        this.setState({modalIsOpen: false})
    }

    dataChange({target: {value, name}}) {
        this.setState({
            user: update(this.state.user, {
                [name]: {$set: value}
            })
        })
    }

    checkField() {
        let error_email, error_password
        let error = 0

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

        this.setState({
            errors: {
                email: error_email,
                password: error_password
            }
        })

        return error
    }

    handleSubmit(event) {
        event.preventDefault()
        this.setState({
            user: {
                email: this.state.user.email,
                password: this.state.user.password
            },
            success: false
        })
        let error_count = this.checkField()
        const user = this.state.user

        if (error_count === 0) {
            $.ajax({
                url: `${URL_API}/sessions`,
                type: 'POST',
                data: {
                    session: {
                        email: user.email,
                        password: user.password
                    }
                },
                dataType: 'json',
                context: this,
                success: function (res) {
                    if (res) {
                        localStorage.setItem('auth_token', res.token)
                        this.setState({
                            errors: {
                                email: false,
                                password: false
                            },
                            success: true
                        })
                        window.location.reload()
                    }
                },
                error: function (error) {
                    this.setState({
                        errors: {
                            email: true,
                            password: error.responseJSON.messages.exception
                        },
                        success: false
                    })
                }
            })
            // resetting data
            this.setState({
                user: {
                    email: '',
                    password: ''
                }
            })
        }
    }

    render() {
        return (
            <div>
                <button className='btn btn-link' onClick={this.openModal}>
                    <i className='fa fa-sign-in' aria-hidden='true'></i> Вхід
                </button>

                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel='Login'
                >
                    <div className='modal-header'>
                        <h2 className='modal-title'>Вхід</h2>
                        <button type='button' className='close'
                                data-dismiss='modal' aria-label='Close'
                                onClick={this.closeModal}>
                            <span aria-hidden='true'>&times;</span>
                        </button>
                    </div>

                    <form className='user-form'>
                        <div className='form-group'>
                            <input
                                className={classNames('required', 'form-control',
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

                        <div className='form-group password'>
                            <input
                                className={classNames('required', 'form-control',
                                    `${this.state.errors.password ? 'error' : ''}`)}
                                name='password'
                                placeholder='Password'
                                type='password'
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
                                value='Вхід'
                                onClick={this.handleSubmit}
                            />
                        </div>
                    </form>

                </Modal>
            </div>
        )
    }
}

export default withRouter(Login)
