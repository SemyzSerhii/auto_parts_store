import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import API from '../api'
import Parser from 'html-react-parser'

import NotFound from './NotFound'
import PageUpload from './PageUpload'

import noPhoto from '../images/no_picture.gif'


class Product extends Component {
    constructor(props) {
        super(props)
        this.state = {
            product: {},
            //for check response data
            responseStatus: ''
        }
    }


    componentDidMount() {
        API.get(`products/${this.props.match.params.id}`)
            .then(function (response) {
                if(response.data) {
                    this.setState({
                        product: response.data,
                        responseStatus: 'true'
                    })
                } else {
                    this.setState({
                        responseStatus: 'null'
                    })
                }
            }.bind(this))

            .catch(function (error) {
                    console.log('error ' + error)
                }
            )
    }

    render() {
        return (
            <div>
                {(() => {
                    switch (this.state.responseStatus) {
                        case 'true':
                            return <div className='product'>
                                <h1>
                                    {this.state.product.name}
                                    {this.state.product.mark ? ` ${this.state.product.mark}` : ''}
                                    {this.state.product.company ? ` / ${this.state.product.company}` : ''}
                                    {this.state.product.model ? ` / ${this.state.product.model}` : ''}
                                </h1>
                                <img
                                    // check if image not -> visible standard image
                                    src={this.state.product.image ? this.state.product.image : noPhoto}
                                    alt={this.state.product.name}
                                />
                                <p>Ціна: {this.state.product.price}</p>
                                <p>{Parser(this.state.product.full_description)}</p>
                            </div>
                        case 'null':
                            return <NotFound/>
                        default:
                            return <PageUpload/>
                    }
                })()}
            </div>
        )
    }
}

export default withRouter(Product)
