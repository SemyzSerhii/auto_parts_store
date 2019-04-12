import React, { Component } from 'react'
import API from '../api'
import { BrowserRouter } from 'react-router-dom'
import UserDataModal from './UserDataModal'
import Login from './Login'
import Logo from '../images/logo.png'
import Cart from '../images/cart.png'

import $ from 'jquery'

class Menu extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pages: [],
            cart: [],
            current_user: {}
        }
        this.showUserMenu = this.showUserMenu.bind(this)
        this.showMainMenu = this.showMainMenu.bind(this)
        this.logout = this.logout.bind(this)
    }

    logout() {
        API.delete('sessions')
            .then(function () {
                window.location.reload()
            })
    }

    showUserMenu(){
        $('#menu-user').slideToggle('slow')
        $('#nav-media').next().hide('slow')
    }

    showMainMenu(){
        $('#nav-media').next().slideToggle('slow')
        $('#menu-user').hide('slow')
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
        API.get('cart', {
            params: {
                cart_id: localStorage.getItem('cart_id')
            }})
            .then(function (response) {
                if(response.data) {
                    this.setState({
                        cart: response.data
                    })
                    if (response.data.id) localStorage.setItem('cart_id', response.data.id)
                }
            }.bind(this), function () {
                this.setState({
                    cart: []
                })
            }.bind(this))
    }

    render() {
        return (
            <div className='menu'>
                <a href='/' title='Auto parts store' className='header-img logo'>
                    <img src={Logo} alt='logo'/>
                </a>
                <div className='main-nav'>
                    <div id='nav-media' onClick={this.showMainMenu}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <nav className='nav'>
                        <a className='nav-link' href='/'>Головна</a>
                        {this.state.pages.map((page) => {
                            return (
                                <li className='nav-item' key={page.id}>
                                    <a className='nav-link'
                                       href={`/pages/${[page.id, page.title.toLowerCase().replace(/ /g, '-')].join('-')}`}
                                    >{page.title}</a>
                                </li>
                            )
                        })}
                    </nav>
                </div>
                <a href='/vin' className='vin-link'>Пошук по vin-коду</a>
                <div className='nav-user'>
                    {this.state.current_user.name ? (
                        <div>
                            <div className='nav-current-user' onClick={this.showUserMenu}>
                                <i className='fa fa-user-o' aria-hidden='true'></i> {this.state.current_user.name}
                            </div>
                                <ul id='menu-user'>
                                    <li><a href='/user'>Профіль</a></li>
                                    <li>
                                        <BrowserRouter>
                                            <UserDataModal/>
                                        </BrowserRouter>
                                    </li>
                                    <li><a href='/orders'>Замовлення</a></li>
                                    <li><a href='/reviews'>Відгуки</a></li>
                                    <li><a href='/wish_list'>Список бажань</a></li>
                                    <li><button className='btn btn-link' onClick={this.logout}>Вийти</button></li>
                                </ul>
                        </div>
                    ) : (
                        <div>
                            <BrowserRouter>
                                <UserDataModal/>
                            </BrowserRouter>
                            <BrowserRouter>
                                <Login/>
                            </BrowserRouter>
                        </div>
                    )
                    }
                </div>
                <a href='/cart' className='cart-link'>
                    <img src={Cart} alt='cart'/>
                    <span>{!this.state.cart.id ? this.state.cart.reduce(function (sum, current) {
                        return sum + current.quantity
                    }, 0) : 0}</span>
                </a>
            </div>
        )
    }
}

export default Menu