import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import classNames from 'classnames/bind'
import paginate from 'paginate-array'
import Parser from 'html-react-parser'

import API from '../api'
import {URL_API} from '../constants'
import noPhoto from '../images/no_picture.gif'
import Search from 'react-search'

class ProductsList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products: [],
            size: 12,
            page: 1,
            currPage: null,
            in_cart:[],
            cart: [],
            sort: ''
        }
        this.previousPage = this.previousPage.bind(this)
        this.nextPage = this.nextPage.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.addProduct = this.addProduct.bind(this)
        this.orderProducts = this.orderProducts.bind(this)
    }

    headerCart() {
        return localStorage.getItem('cart_token') ? {'Cart': localStorage.getItem('cart_token')} : {}
    }

    componentWillMount() {
        let path
        if (this.props.location.pathname.includes('/categories/')) {
            path = `${URL_API}/products/categories/${this.props.match.params.id}`
        } else {
            path = `${URL_API}/products`
        }
        fetch(path)
            .then(response => response.json())
            .then(products => {
                const { page, size } = this.state

                const currPage = paginate(products, page, size)

                this.setState({
                    ...this.state,
                    products,
                    currPage
                })
            })

        API.get('cart', {headers: this.headerCart()})
            .then(function (response) {
                if(response.data) {
                    this.setState({
                        cart: response.data.line_items
                    })
                    if (response.data.cart_token) localStorage.setItem('cart_token', response.data.cart_token)
                }
            }.bind(this), function () {
                this.setState({
                    cart: []
                })
            }.bind(this))
    }

    orderProducts(sort){
        this.setState({
            sort: sort.target.value
        })
        let path
        if (sort.target.value) {
            if (this.props.location.pathname.includes('/categories/')) {
                path = `${URL_API}/products/categories/${this.props.match.params.id}/sort/${sort.target.value}`
            } else {
                path = `${URL_API}/sort/${sort.target.value}`
            }

            fetch(path)
                .then(response => response.json())
                .then(products => {
                    const { page, size } = this.state

                    const currPage = paginate(products, page, size)

                    this.setState({
                        ...this.state,
                        products,
                        currPage
                    })
                })
        }
    }

    getItemsAsync(searchValue) {
        let path
        if (this.props.location.pathname.includes('/categories/')) {
            path = `${URL_API}/products/categories/${this.props.match.params.id}?search=${searchValue}`
        } else {
            path = `${URL_API}/products?search=${searchValue}`
        }

        fetch(path).then(response => response.json())
            .then(products => {
                const { page, size } = this.state

                const currPage = paginate(products, page, size)

                this.setState({
                    ...this.state,
                    products,
                    currPage
                })
            })
    }

    previousPage() {
        const { page, size, products } = this.state

        if (page > 1) {
            const newPage = page - 1
            const newCurrPage = paginate(products, newPage, size)

            this.setState({
                ...this.state,
                page: newPage,
                currPage: newCurrPage
            })
        }
    }

    nextPage() {
        const { currPage, page, size, products } = this.state

        if (page < currPage.totalPages) {
            const newPage = page + 1
            const newCurrPage = paginate(products, newPage, size)
            this.setState({ ...this.state, page: newPage, currPage: newCurrPage })
        }
    }

    handleChange(e) {
        const { value } = e.target
        const { products } = this.state

        const newSize = +value
        const newPage = 1
        const newCurrPage = paginate(products, newPage, newSize)

        this.setState({
            ...this.state,
            size: newSize,
            page: newPage,
            currPage: newCurrPage
        })
    }

    addProduct(id) {
        API.post('line_items', {product_id: id}, {headers: this.headerCart()})
            .then(res => {
                if (res.data.cart_token) localStorage.setItem('cart_token', res.data.cart_token)
                if(res.status === 201) {
                    this.setState({
                        in_cart: this.state.in_cart.concat([id])
                    })
                }
            })
    }

    checkInCart(id) {
        return ((this.state.in_cart.length !== 0 && this.state.in_cart.indexOf(id) !== -1) ||
            (!this.state.cart.id && this.state.cart.find(
                function (item) {
                    return item.product.id === parseInt(id)
                })))
    }

    render() {
        const { page, size, currPage } = this.state
        var count = 0

        return (
            <div className='products'>
                <div className='row sort'>
                    <div className='form-group col-auto'>
                        <label htmlFor='order'>Сортувати: </label>
                        <select className='form-control' id='order'
                                value={this.state.sort} onChange={this.orderProducts}>
                            <option value='hide'></option>
                            <option value='price'>Ціна за зростанням</option>
                            <option value='price_desc'>Ціна за спаданням</option>
                            <option value='name'>За назвою: A->Z</option>
                            <option value='name_desc'>За назвою: Z->A</option>
                        </select>
                    </div>

                    <div className='form-group col-auto'>
                        <label htmlFor='size'>Кількість: </label>
                        <select className='form-control' name='size' id='size' onChange={this.handleChange}>
                            <option value='12'>12</option>
                            <option value='28'>28</option>
                            <option value='40'>40</option>
                        </select>
                    </div>
                </div>

                <div className='row search'>
                    <div className='form-group col-auto'>
                        <div className='form-control sample-search'>
                            <Search items={this.state.products}
                                    multiple={true}
                                    getItemsAsync={this.getItemsAsync.bind(this)}
                                    placeholder='Пошук'/>
                        </div>
                    </div>
                    <div className='form-group col-auto'>
                        <a href='/search' className='search-link'>Розширений пошук</a>
                    </div>
                </div>

                {currPage &&
                <div className='row'>
                    {currPage.data.map(product => {
                        var rating = Math.round(product.rating)
                        count++
                        return(
                            <div className='col-md-4 col-sm-6' key={product.id}>
                                <div className='product'>
                                    <div className='product-image'>
                                        <a className='img-link' href={`/products/${product.id}`}>
                                            <img
                                                // check if image not -> visible standard image
                                                className={product.image.url ? '' : 'no-image'}
                                                src={product.image.url ? product.image.url : noPhoto}
                                                alt={product.name}
                                            />
                                        </a>
                                        <ul className='social'>
                                            <li><a href={`/products/${product.id}`}
                                                   data-tip='Переглянути'>
                                                <i className='fa fa-eye'></i>
                                            </a></li>
                                            <li>
                                                <a href='/' data-tip='В список бажань'>
                                                    <i className='fa fa-heart'></i>
                                                </a>
                                            </li>
                                            <li>
                                                {this.checkInCart(product.id)  ?
                                                    ('') :
                                                    (<button onClick={() => {this.addProduct(product.id)}}
                                                             data-tip='В корзину'>
                                                        <i className='fa fa-shopping-cart'></i>
                                                    </button>)
                                                }
                                            </li>
                                        </ul>
                                        {this.checkInCart(product.id) ?
                                            (<a href='/cart' className='cart'>
                                                <i className='fa fa-cart-plus' aria-hidden='true'></i> В корзині
                                            </a>) :
                                            (<button
                                                className='add-to-cart'
                                                onClick={() => {this.addProduct(product.id)}}
                                            >Купити</button>)}
                                    </div>
                                    <div className='product-content'>
                                        <a
                                            className='title'
                                            key={product.id}
                                            href={`/products/${product.id}`}>
                                            {product.name} {product.model} {product.brand ?
                                            ` / ${product.brand}` : ''}
                                        </a>

                                        <p>Ціна: {product.price} грн</p>

                                        <ul className='rating'
                                            data-index={product.rating ? rating : 0 }>
                                            <li className={classNames('fa','fa-star',
                                                `${rating === 0 ? 'disable' : ''}`)}></li>
                                            <li className={classNames('fa','fa-star',
                                                `${rating <= 1 ? 'disable' : ''}`)}></li>
                                            <li className={classNames('fa','fa-star',
                                                `${rating <= 2 ?' disable' : ''}`)}></li>
                                            <li className={classNames('fa','fa-star',
                                                `${rating <= 3 ? 'disable' : ''}`)}></li>
                                            <li className={classNames('fa','fa-star',
                                                `${rating <= 4 ? 'disable' : ''}`)}></li>
                                        </ul>
                                        <p>{product.company ? `Виробник: ${product.company}` : ''}</p>
                                        <div className='short-description'>{product.short_description ?
                                            Parser(product.short_description) : ''}</div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                } {currPage ?
                    (currPage.data.length === size || page !== 1 ? (
                        <ul className='pagination justify-content-center'>
                            <li className={classNames('page-item', `${page <= 1 ? 'disabled' : ''}`)}>
                                <button className='page-link' onClick={this.previousPage}>Попередня</button>
                            </li>
                            <li className='page-item active'><p className='page-link'>{page}</p></li>
                            <li className={classNames('page-item', `${count < size ? 'disabled' : ''}`)}>
                                <button className='page-link' onClick={this.nextPage}>Наступна</button>
                            </li>
                        </ul>
                        ) : ''
                    ) : ''
                }

            </div>
        )
    }
}

export default withRouter(ProductsList)
