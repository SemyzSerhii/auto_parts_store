import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import classNames from 'classnames/bind'
import paginate from 'paginate-array'
import Parser from 'html-react-parser'
import noPhoto from '../images/no_picture.gif'
import API from '../api'

class ProductsList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products: [],
            size: 12,
            page: 1,
            currPage: null,
            in_cart:[],
            order: ''
        }
        this.previousPage = this.previousPage.bind(this)
        this.nextPage = this.nextPage.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.addProduct = this.addProduct.bind(this)
        this.orderProducts = this.orderProducts.bind(this)
    }

    componentWillMount() {
        var path
        if (this.props.location.pathname.includes("/categories/")) {
            path = `http://localhost:3000/api/v1/products/categories/${this.props.match.params.id}`
        } else {
            path = `http://localhost:3000/api/v1/products`
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

    orderProducts(order){
        this.setState({
            order: order.target.value
        })
        var path
        if (order.target.value) {
            if (this.props.location.pathname.includes("/categories/")) {
                path = `http://localhost:3000/api/v1/products/categories/${this.props.match.params.id}/order/${order.target.value}`
            } else {
                path = `http://localhost:3000/api/v1/order/${order.target.value}`
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
        API.post('line_items', {
            product_id: id
        })
            .then(res => {
                if(res.status === 201) {
                    this.setState({
                        in_cart: this.state.in_cart.concat([id])
                    })
                }
            })
    }

    render() {
        const { page, size, currPage } = this.state
        var count = 0

        return (
            <div className="products">
                <div className='row'>
                <div className="form-group col">
                    <label htmlFor="order">Сортувати: </label>
                <select className='form-control' id='order'
                        value={this.state.order} onChange={this.orderProducts}>
                    <option value="hide"></option>
                    <option value="price">Ціна за зростанням</option>
                    <option value="price_desc">Ціна за спаданням</option>
                    <option value="name">За назвою: A->Z</option>
                    <option value="name_desc">За назвою: Z->A</option>
                </select>
                </div>

                <div className="form-group col">
                    <label htmlFor="size">Кількість: </label>
                    <select className="form-control" name="size" id="size" onChange={this.handleChange}>
                        <option value="12">12</option>
                        <option value="28">28</option>
                        <option value="40">40</option>
                    </select>
                </div>
                </div>

                {currPage &&
                <div className='row'>
                    {currPage.data.map(product => {
                        var rating = Math.round(product.rating)
                        count++
                        return(
                            <div className="col-md-4 col-sm-6" key={product.id}>
                                <div className="product">
                                    <div className="product-image">
                                        <a className='img-link' href={`/products/${product.id}`}>
                                            <img
                                                // check if image not -> visible standard image
                                                className={product.image.url ? '' : 'no-image'}
                                                src={product.image.url ? product.image.url : noPhoto}
                                                alt={product.name}
                                            />
                                        </a>
                                        <ul className="social">
                                            <li><a href={`/products/${product.id}`}
                                                   data-tip="Переглянути">
                                                <i className="fa fa-eye"></i>
                                            </a></li>
                                            <li>
                                                <a href="/" data-tip="В список бажань">
                                                    <i className="fa fa-heart"></i>
                                                </a>
                                            </li>
                                            <li>
                                                {this.state.in_cart.indexOf(product.id) != -1  ?
                                                    ('') :
                                                    (<button onClick={() => {this.addProduct(product.id)}}
                                                             data-tip="В корзину">
                                                        <i className="fa fa-shopping-cart"></i>
                                                    </button>)
                                                }
                                            </li>
                                        </ul>
                                        {this.state.in_cart.indexOf(product.id) != -1  ?
                                            (<a href='/' className='cart'>
                                                <i className="fa fa-cart-plus" aria-hidden="true"></i> В корзині
                                            </a>) :
                                            (<button
                                            className="add-to-cart"
                                            onClick={() => {this.addProduct(product.id)}}
                                        >Купити</button>)}
                                    </div>
                                    <div className="product-content">
                                        <a
                                            className='title'
                                            key={product.id}
                                            href={`/products/${product.id}`}>
                                            {product.name} {product.model} {product.brand ?
                                            ` / ${product.brand}` : ''}
                                        </a>

                                        <p>Ціна: {product.price}</p>

                                        <ul className="rating"
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
                        <ul className="pagination justify-content-center">
                            <li className={classNames('page-item', `${page <= 1 ? 'disabled' : ''}`)}>
                                <button className="page-link" onClick={this.previousPage}>Попередня</button>
                            </li>
                            <li className="page-item active"><p className="page-link">{page}</p></li>
                            <li className={classNames("page-item", `${count < size ? 'disabled' : ''}`)}>
                                <button className="page-link" onClick={this.nextPage}>Наступна</button>
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
