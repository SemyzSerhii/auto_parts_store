import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import API from '../api'

import NotFound from './NotFound'
import PageUpload from './PageUpload'


class Page extends Component {
    constructor(props) {
        super(props)
        this.state = {
            page: {},
            //for check response data
            responseStatus: ''
        }
    }


    componentDidMount() {
        API.get(`pages/${this.props.match.params.id}`)
            .then(function (response) {
                if(response.data) {
                    this.setState({
                        page: response.data,
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
                            return <div className='page'>
                                        <h1>{this.state.page.title}</h1>
                                        <p>{this.state.page.body}</p>
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

export default withRouter(Page)
