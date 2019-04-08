import React, { Component } from 'react'
import API from '../api'

class CategoriesList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            categories: []
        }
    }

    componentWillMount() {
        API.get('categories')
            .then(function (response) {
                if(response.data) {
                    this.setState({
                        categories: response.data
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
            <div className='col-auto' id='sidebar'>
                <ul className='list-group'>
                    {this.state.categories.map((category) => {
                        return (
                            <li className='list-group-item' key={category.id}>
                                <a
                                    className={category.ancestry ? 'nested_categories' : ''}
                                   href={`/categories/${category.id}`}>{category.title}</a>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

export default CategoriesList