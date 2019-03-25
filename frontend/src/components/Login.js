import React, { Component } from 'react'
import Modal from 'react-modal'
import { withRouter } from 'react-router-dom'
import update from 'immutability-helper'
import API from '../api'

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


    handleSubmit(event) {
        event.preventDefault()
        this.setState({
            user: {
                email: this.state.user.email,
                password: this.state.user.password
            },
            success: false
        })

        const user = this.state.user
        // check errors exist
        if (this.state.errors.email ||
            this.state.errors.password) {
            this.setState({success: false}).bind(this)
        } else {
            API.post('/session', {
                email: user.email,
                password: user.password
            })
                .catch(function (error) {
                    console.log(error)
                })
            // resetting data
            this.setState({
                user: {
                    email: '',
                    password: ''
                },
                success: true
            })

        }
    }

    render() {
        return (
            <div>
                <button className='nav-link btn btn-link' onClick={this.openModal}>
                    <i className="fa fa-sign-in" aria-hidden="true"></i> Вхід
                </button>

                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Login"
                >
                    <div className="modal-header">
                        <h2 className="modal-title">Вхід</h2>
                        <button type="button" className="close"
                                data-dismiss="modal" aria-label="Close"
                                onClick={this.closeModal}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <form className='user-form'>
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

                        <div className='form-group password'>
                            <input
                                className='required form-control'
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

                </Modal>
            </div>
        )
    }
}

export default withRouter(Login)
