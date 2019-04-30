import React, { Component } from 'react'
import {URL_API} from '../constants'
import { withRouter } from 'react-router-dom'
import paginate from 'paginate-array'
import API from '../api'
import noPhoto from '../images/no_picture.gif'
import classNames from 'classnames/bind'
import Parser from 'html-react-parser'

class AdvancedSearch extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products: [],
            categories: [],
            category: '',
            mark: '',
            model: '',
            year: '',
            company: '',
            size: 12,
            page: 1,
            currPage: null,
            in_cart:[],
            cart: []
        }
        this.handleChange = this.handleChange.bind(this)
        this.request = this.request.bind(this)
        this.previousPage = this.previousPage.bind(this)
        this.nextPage = this.nextPage.bind(this)
        this.addProduct = this.addProduct.bind(this)
    }

    headerCart() {
        return localStorage.getItem('cart_token') ? {'Cart': localStorage.getItem('cart_token')} : {}
    }

    handleChange(event) {
        this.request(event)
        this.setState({
            [event.target.name]: event.target.value
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

    request(event) {
        let path
        let search = event.target.name === 'category' ? '' : `?search=${event.target.value}`
        if(this.state.mark) search += `+${this.state.mark}`
        if(this.state.model) search += `+${this.state.model}`
        if(this.state.year) search += `+${this.state.year}`
        if(this.state.company) search += `+${this.state.company}`

        let path_category = ((event.target.name === 'category' ? event.target.value : false) || this.state.category)
        if (path_category) {
            path = `${URL_API}/products/categories/${path_category}`
        } else {
            path = `${URL_API}/products`
        }
        fetch(`${path}${search}`)
            .then(response => response.json())
            .then(products => {
                const {page, size} = this.state

                const currPage = paginate(products, page, size)

                this.setState({
                    ...this.state,
                    products,
                    currPage
                })
            })
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
        const marks = [...new Set(this.state.products.map(item => item.brand))]
        const models = [...new Set(this.state.products.map(item => item.model))]
        const companies = [...new Set(this.state.products.map(item => item.company))]
        const years = [...new Set(this.state.products.map(item => item.year))]
        const { page, size, currPage } = this.state
        var count = 0
        let key = 0
        return (
            <div>
            <form>
                <div className='form-group col-auto'>
                    <label htmlFor='category'>Категорія: </label>
                    <select value={this.state.category}
                            className='form-control' name='category' id='category' onChange={this.handleChange}>
                        <option></option>
                        {this.state.categories.map(function (category) {
                            return category.ancestry ? (
                                <option value={category.id} key={category.id}>- {category.title}</option>
                            ) : (
                                <option value={category.id} key={category.id}>{category.title}</option>
                            )
                        })}
                    </select>
                </div>
                <div className='form-group col-auto'>
                    <label htmlFor='mark'>Марка: </label>
                    <select value={this.state.mark}
                            className='form-control' name='mark' id='mark' onChange={this.handleChange}>
                        <option value='hide'>{this.state.mark}</option>
                        {marks.map(function (mark) {
                            return <option value={mark} key={key++}>{mark}</option>
                        })}
                    </select>
                </div>
                <div className='form-group col-auto'>
                    <label htmlFor='model'>Модель: </label>
                    <select value={this.state.model}
                            className='form-control' name='model' id='model' onChange={this.handleChange}>
                        <option>{this.state.model}</option>
                        {models.map(function (model) {
                            return <option value={model} key={key++}>{model}</option>
                        })}
                    </select>
                </div>
                <div className='form-group col-auto'>
                    <label htmlFor='year'>Рік: </label>
                    <select value={this.state.year}
                            className='form-control' name='year' id='year' onChange={this.handleChange}>
                        <option>{this.state.year}</option>
                        {years.map(function (year) {
                            return <option value={year} key={key++}>{year}</option>
                        })}
                    </select>
                </div>
                <div className='form-group col-auto'>
                    <label htmlFor='company'>Компанія: </label>
                    <select value={this.state.company}
                            className='form-control' name='company' id='company' onChange={this.handleChange}>
                        <option>{this.state.company}</option>
                        {companies.map(function (company) {
                            return <option value={company} key={key++}>{company}</option>
                        })}
                    </select>
                </div>
            </form>
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
                }{currPage ?
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

export default withRouter(AdvancedSearch)