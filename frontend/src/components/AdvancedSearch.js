import React, { Component } from 'react'
import {URL_API} from '../constants'
import paginate from 'paginate-array'
import API from '../api'

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
            company: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.request = this.request.bind(this)
    }

    handleChange(event) {
        this.request(event)
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    request(event) {
        let path
        let path_search = `?search=${event.target.name === 'categories' ? '' : event.target.value}`
        let path_category = ((event.target.name === 'categories' ? event.target.value : false) || this.state.category)
        if (path_category) {
            path = `${URL_API}/products/categories/${path_category}`
        } else {
            path = `${URL_API}/products`
        }
        fetch(`${path}${path_search}`).then(response => response.json())
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

    handleSubmit(event) {
        fetch(`${URL_API}/products/categories/${this.state.category}?search=${event.target.value}`).then(response => response.json())
            .then(products => {
                const {page, size} = this.state

                const currPage = paginate(products, page, size)

                this.setState({
                    ...this.state,
                    products,
                    currPage
                })
            })
        event.preventDefault()
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
    }

    render() {
        const marks = [...new Set(this.state.products.map(item => item.brand))]
        const models = [...new Set(this.state.products.map(item => item.model))]
        const companies = [...new Set(this.state.products.map(item => item.company))]
        const years = [...new Set(this.state.products.map(item => item.year))]
        let key = 0
        return (
            <form onSubmit={this.handleSubmit}>
                <div className='form-group col-auto'>
                    <label htmlFor='categories'>Категорія: </label>
                    <select value={this.state.category}
                            className='form-control' name='categories' id='categories' onChange={this.handleChange}>
                        <option value='hide'></option>
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
                        <option value='hide'></option>
                        {marks.map(function (mark) {
                            return <option value={mark} key={key++}>{mark}</option>
                        })}
                    </select>
                </div>
                <div className='form-group col-auto'>
                    <label htmlFor='model'>Модель: </label>
                    <select value={this.state.model}
                            className='form-control' name='model' id='model' onChange={this.handleChange}>
                        <option value='hide'></option>
                        {models.map(function (model) {
                            return <option value={model} key={key++}>{model}</option>
                        })}
                    </select>
                </div>
                <div className='form-group col-auto'>
                    <label htmlFor='year'>Рік: </label>
                    <select value={this.state.year}
                            className='form-control' name='year' id='year' onChange={this.handleChange}>
                        <option value='hide'></option>
                        {years.map(function (year) {
                            return <option value={year} key={key++}>{year}</option>
                        })}
                    </select>
                </div>
                <div className='form-group col-auto'>
                    <label htmlFor='company'>Компанія: </label>
                    <select value={this.state.company}
                            className='form-control' name='company' id='company' onChange={this.handleChange}>
                        <option value='hide'></option>
                        {companies.map(function (company) {
                            return <option value={company} key={key++}>{company}</option>
                        })}
                    </select>
                </div>
                <input type="submit" value="Пошук" />
            </form>
        )
    }
}

export default AdvancedSearch