import React, { Component } from 'react'

export default class NotFound extends Component {
    render () {
        return (
            <div className='centered-content page-404'>
                <h1>404</h1>
                <h3>Page not found!</h3>
                <p>The page you`re looking for was not found.</p>
            </div>
        )
    }
}
