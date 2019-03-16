import React, { Component } from 'react'
import API from '../api'

class Menu extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pages: []
        }
    }

    componentDidMount() {
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
            <div>
                {(() => {

                    return <div className='nav'>
                        {this.state.pages.map((product) => {
                            return(
                                <div className="nav-link" key={product.id} >
                                    <p>{product.title}</p>
                                </div>
                            )
                        })}
                    </div>

                })()}
            </div>
        )
    }
}

export default Menu