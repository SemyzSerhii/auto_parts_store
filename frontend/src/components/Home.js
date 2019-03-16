import React, { Component } from 'react'
import Modal from 'react-modal'
import { withRouter } from 'react-router-dom'

import FormUser from './FormUser'
import ProductsList from './ProductsList'

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

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products: [],
            modalIsOpen: false
        }
        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
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

                <button className='nav-link btn btn-link' onClick={this.openModal}>
                    <i className="fa fa-user-o" aria-hidden="true"></i> Registration
                </button>

                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Registration"
                >
                    <div className="modal-header">
                        <h2 className="modal-title">Registration</h2>
                        <button type="button" className="close"
                                data-dismiss="modal" aria-label="Close"
                                onClick={this.closeModal}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <FormUser/>
                </Modal>

                <ProductsList/>
            </div>
        )
    }
}

export default withRouter(Home)
