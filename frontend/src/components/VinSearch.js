import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import classNames from "classnames/bind"
import { URL_API } from '../constants'
import $ from 'jquery'
import noPhoto from "../images/no_picture.gif";
import Parser from "html-react-parser";

class VinSearch extends Component {
    constructor(props) {
        super(props)
        this.state = {
            vin: '',
            error: '',
            success: false,
            products: []
        }
        this.dataChange = this.dataChange.bind(this)
        this.checkField = this.checkField.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    dataChange(event) {
        this.setState({vin: event.target.value})
    }

    checkField() {
        let error_vin
        let error = 0

        if (this.state.vin.length === 17) {
            error_vin = ''
        } else {
            error_vin = 'Довжина не менше 17 симовлів.'
            error++
        }

        this.setState({
            error: error_vin
        })
        return error
    }

    handleSubmit(event) {
        event.preventDefault()
        this.setState({
            vin: this.state.vin,
            success: false
        })
        let error_count = this.checkField()

        if (error_count === 0) {
            $.ajax({
                url: `${URL_API}/products`,
                type: 'GET',
                data: {vin_code: this.state.vin},
                dataType: 'json',
                context: this,
                success: function (res) {
                    if (res.data) {
                        this.setState({
                            error: false,
                            success: true,
                            products: res.data
                        })
                    }
                },
                error: function (error) {
                    this.setState({
                        error: error.error,
                        success: false
                    })
                }
            })
            // resetting data
            this.setState({
                vin: ''
            })
        }
    }

    render() {
        return (
            <div>
                <form>
                    <div className='form-group col-auto'>
                        <input
                            className={classNames('required', 'form-control',
                                `${this.state.error ? 'error' : ''}`)}
                            name='vin'
                            placeholder='vin-code'
                            type='text'
                            value={this.state.vin}
                            onChange={this.dataChange}
                        />
                        <div className='text-danger'>
                            {this.state.error}
                        </div>
                    </div>
                    <div className='form-group text-center'>
                        <input
                            className='btn btn-primary'
                            type='submit'
                            value='Пошук'
                            onClick={this.handleSubmit}
                        />
                    </div>
                </form>
                <div className='row'>
                    {!this.state.products.length ? 'Нічого не знайдено' : (
                    this.state.products.map(product => {
                        var rating = Math.round(product.rating)
                        return (
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
                                        </ul>
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
                                            data-index={product.rating ? rating : 0}>
                                            <li className={classNames('fa', 'fa-star',
                                                `${rating === 0 ? 'disable' : ''}`)}></li>
                                            <li className={classNames('fa', 'fa-star',
                                                `${rating <= 1 ? 'disable' : ''}`)}></li>
                                            <li className={classNames('fa', 'fa-star',
                                                `${rating <= 2 ? ' disable' : ''}`)}></li>
                                            <li className={classNames('fa', 'fa-star',
                                                `${rating <= 3 ? 'disable' : ''}`)}></li>
                                            <li className={classNames('fa', 'fa-star',
                                                `${rating <= 4 ? 'disable' : ''}`)}></li>
                                        </ul>
                                        <p>{product.company ? `Виробник: ${product.company}` : ''}</p>
                                        <div className='short-description'>{product.short_description ?
                                            Parser(product.short_description) : ''}</div>
                                    </div>
                                </div>
                            </div>
                        )
                    }))}
                </div>
            </div>
        )
    }
}

export default withRouter(VinSearch)