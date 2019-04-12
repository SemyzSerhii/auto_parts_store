import React, { Component } from 'react'
import Modal from 'react-modal'
import { withRouter } from 'react-router-dom'
import classNames from 'classnames/bind'

import FormUser from './FormUser'

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

class UserDataModal extends Component {
    constructor() {
        super()
        this.state = {
            modalIsOpen: false,
            current_user: ''
        }
        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
    }

    componentWillMount() {
        this.setState({
            current_user: this.props.user
        })
    }

    openModal() {
        this.setState({modalIsOpen: true})
    }

    closeModal() {
        this.setState({modalIsOpen: false})
    }

    render() {
        return (
            <div>
                <button className='btn btn-link' onClick={this.openModal}>
                    <i className={classNames('fa',
                        `${this.state.current_user ? '' : 'fa-user-o'}`)} aria-hidden='true'>

                    </i>
                    {this.state.current_user ? 'Змінити дані' : ' Реєстрація'}
                </button>

                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Registration"
                >
                    <div className="modal-header">
                        <h2 className="modal-title"> {this.state.current_user ? 'Змінити дані' : 'Зареєструватися'}</h2>
                        <button type="button" className="close"
                                data-dismiss="modal" aria-label="Close"
                                onClick={this.closeModal}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <FormUser user={this.state.current_user}/>
                </Modal>
            </div>
        )
    }
}

export default withRouter(UserDataModal)
