import React, { Component } from 'react'
import classNames from 'classnames/bind'
import paginate from 'paginate-array'
import Parser from 'html-react-parser'
import noPhoto from '../images/no_picture.gif'

class ProductsList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products: [],
            size: 12,
            page: 1,
            currPage: null
        }
        this.previousPage = this.previousPage.bind(this)
        this.nextPage = this.nextPage.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    componentWillMount() {
        fetch(`http://localhost:3000/api/v1/products`)
            .then(response => response.json())
            .then(products => {
                const { page, size } = this.state;

                const currPage = paginate(products, page, size);

                this.setState({
                    ...this.state,
                    products,
                    currPage
                });
            });

    }

    previousPage() {
        const { currPage, page, size, products } = this.state;

        if (page > 1) {
            const newPage = page - 1;
            const newCurrPage = paginate(products, newPage, size);

            this.setState({
                ...this.state,
                page: newPage,
                currPage: newCurrPage
            });
        }
    }

    nextPage() {
        const { currPage, page, size, products } = this.state;

        if (page < currPage.totalPages) {
            const newPage = page + 1;
            const newCurrPage = paginate(products, newPage, size);
            this.setState({ ...this.state, page: newPage, currPage: newCurrPage });
        }
    }

    handleChange(e) {
        const { value } = e.target;
        const { products, page } = this.state;

        const newSize = +value;
        const newPage = 1;
        const newCurrPage = paginate(products, newPage, newSize);

        this.setState({
            ...this.state,
            size: newSize,
            page: newPage,
            currPage: newCurrPage
        });
    }

    render() {
        const { page, size, currPage } = this.state
        var count = 0

        return (
            <div className="products">
                <div className="form-group">
                    <label htmlFor="size">Кількість: </label>
                    <select className="form-control" name="size" id="size" onChange={this.handleChange}>
                        <option value="12">12</option>
                        <option value="28">28</option>
                        <option value="40">40</option>
                    </select>
                </div>

                {currPage &&
                <div className='row'>
                    {currPage.data.map(product => {
                        var rating = Math.round(product.rating)
                        count++
                        return(
                            <div className="col-md-3 col-sm-6" key={product.id}>
                                <div className="product">
                                    <div className="product-image">
                                        <a className='img-link' href={`/products/${product.id}`}>
                                            <img
                                                // check if image not -> visible standard image
                                                className={product.image ? '' : 'no-image'}
                                                src={product.image ? product.image.url : noPhoto}
                                                alt={product.name}
                                            />
                                        </a>
                                        <ul className="social">
                                            <li><a href={`/products/${product.id}`}
                                                   data-tip="Переглянути">
                                                <i className="fa fa-eye"></i>
                                            </a></li>
                                            <li>
                                                <a href="#" data-tip="В список бажань">
                                                    <i className="fa fa-heart"></i>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" data-tip="В корзину">
                                                    <i className="fa fa-shopping-cart"></i>
                                                </a>
                                            </li>
                                        </ul>
                                        <a className="add-to-cart" href="">Купити</a>
                                    </div>
                                    <div className="product-content">
                                        <a
                                            className='title'
                                            key={product.id}
                                            href={`/products/${product.id}`}
                                        >{product.name} {product.model} {product.mark ? ` / ${product.mark}` : ''}
                                        </a>

                                        <p>Ціна: {product.price}</p>

                                        <ul className="rating"
                                            data-index={product.rating ? rating : 0 }>
                                            <li className={classNames('fa','fa-star', `${rating === 0 ? 'disable' : ''}`)}></li>
                                            <li className={classNames('fa','fa-star', `${rating <= 1 ? 'disable' : ''}`)}></li>
                                            <li className={classNames('fa','fa-star', `${rating <= 2 ?' disable' : ''}`)}></li>
                                            <li className={classNames('fa','fa-star', `${rating <= 3 ? 'disable' : ''}`)}></li>
                                            <li className={classNames('fa','fa-star', `${rating <= 4 ? 'disable' : ''}`)}></li>
                                        </ul>
                                        <p>{product.company ? `Виробник: ${product.company}` : ''}</p>
                                        <div className='short-description'>{Parser(product.short_description)}</div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                }
                    <ul className="pagination justify-content-center">
                        <li  className={classNames('page-item',`${page  <= 1 ? 'disabled' : ''}`)}>
                            <button className="page-link" onClick={this.previousPage}>Попередня</button>
                        </li>
                        <li className="page-item active"><p className="page-link">{page}</p></li>
                        <li className={classNames("page-item", `${count < size ? 'disabled' : ''}`)}>
                            <button className="page-link" onClick={this.nextPage}>Наступна</button>
                        </li>
                    </ul>
            </div>
        )
    }
}

export default ProductsList
