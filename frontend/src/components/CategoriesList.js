import React, { Component } from 'react'
import API from '../api'
import $ from 'jquery'

class CategoriesList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            categories: []
        }
        this.closeSidebar = this.closeSidebar.bind(this)
        this.showSidebar = this.showSidebar.bind(this)
    }

    closeSidebar() {
        $('#sidebar').removeClass('toggled')
        $('.sidebar-wrapper').hide()
    }

    showSidebar() {
        $('#sidebar').addClass('toggled')
        $('.sidebar-wrapper').show()
    }

    componentDidMount() {
        API.get('categories')
            .then(function (response) {
                if(response.data) {
                    this.setState({
                        categories: response.data
                    })
                }
            }.bind(this))

        if (window.innerWidth <= 600) {
            this.closeSidebar()
        }
    }

    render() {
        return (
            <div id='sidebar' className='toggled'>
                <button id='show-sidebar' className='btn btn-sm btn-dark' onClick={this.showSidebar}>
                    <i className='fa fa-bars'></i>
                </button>
                <nav className='sidebar-wrapper'>
                    <div className='sidebar-content'>
                        <div className='sidebar-brand'>
                            <p>Категорії</p>
                            <div id='close-sidebar' onClick={this.closeSidebar}>
                                <i className='fa fa-times' aria-hidden='true'></i>
                            </div>
                        </div>

                        <div className='sidebar-menu'>
                            <ul>
                                {this.state.categories.map((category) => {
                                    return (
                                        <li key={category.id} className={category.children ? 'sidebar-dropdown' : ''}>
                                            <a href={`/categories/${category.id}`}><span>{category.title}</span></a>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}

export default CategoriesList