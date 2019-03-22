import React, { Component } from 'react'
import API from '../api'

class Menu extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pages: []
        }
    }

    componentWillMount() {
        API.get('pages')
            .then(function (response) {
                if(response.data) {
                    this.setState({
                        pages: response.data
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
                <nav className='nav'>
                    <a className='nav-link' href='/'>Home</a>
                    {this.state.pages.map((page) => {
                        return (
                            <a
                                className='nav-link'
                                key={page.id}
                                href={`/pages/${[page.id, page.title.toLowerCase().replace(/ /g, '-')].join("-")}`}
                            >{page.title}</a>
                        )
                    })}
                </nav>
        )
    }
}

export default Menu