import React, { Component } from 'react'
import API from '../api'
import $ from 'jquery'
import classNames from 'classnames/bind'

class CategoriesList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            categories: []
        }
        this.closeSidebar = this.closeSidebar.bind(this)
        this.showSidebar = this.showSidebar.bind(this)
        this.openSubMenu = this.openSubMenu.bind(this)
    }

    closeSidebar() {
        $('#sidebar').removeClass('toggled')
        $('.sidebar-wrapper').hide()
    }

    showSidebar() {
        $('#sidebar').addClass('toggled')
        $('.sidebar-wrapper').show('slow')
    }

    openSubMenu(id){
        $(`#category${id}`).next().slideToggle('slow')
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
                                        category.ancestry === null ? (
                                            <li key={category.id}
                                                className={classNames(`${
                                                    this.state.categories.find(
                                                        function (item) {
                                                            return item.ancestry == category.id
                                                        }) ? 'sidebar-dropdown' : ''}`)}>
                                                <div onClick={() => this.openSubMenu(category.id)}
                                                     id={`category${category.id}`}>
                                                    <a href={`/categories/${category.id}`}>
                                                        {category.title}
                                                    </a>
                                                </div>
                                                <ul className='sidebar-submenu'>
                                                    {this.state.categories.map((children) => {
                                                        return (
                                                            parseInt(children.ancestry) === category.id ? (
                                                                <li key={children.id}>
                                                                    <a href={`/categories/${children.id}`}>
                                                                        {children.title}
                                                                    </a>
                                                                </li>
                                                            ) : ('')
                                                        )
                                                    })}
                                                </ul>
                                            </li>) : ('')
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