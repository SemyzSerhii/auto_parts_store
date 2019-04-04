import React, { Component } from 'react'
import API from '../api'
import { BrowserRouter } from 'react-router-dom'
import UserDataModal from './UserDataModal'
import Login from './Login'

class Menu extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pages: [],
            current_user: {},
            menu: false
        }
        this.showMenu = this.showMenu.bind(this)
    }

    showMenu(){
        this.setState({menu: !this.state.menu})
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
            <div className='menu'>
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
                <div className='nav-user'>
                    {this.state.current_user.name ? (
                        <div>
                            <div className='nav-current-user' onClick={this.showMenu}>
                                {this.state.current_user.name}
                            </div>
                            {this.state.menu ? (
                                <ul>
                                    <li><a href='/user'>Профіль</a></li>
                                    <li>
                                        <BrowserRouter>
                                            <UserDataModal/>
                                        </BrowserRouter>
                                    </li>
                                    <li><a href='/orders'>Замовлення</a></li>
                                    <li><a href='/reviews'>Відгуки</a></li>
                                    <li><a href='/wish_list'>Список бажань</a></li>
                                </ul>
                            ) : ('')}
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
                <a href='/cart'>Корзина</a>
            </div>
        )
    }
}

export default Menu