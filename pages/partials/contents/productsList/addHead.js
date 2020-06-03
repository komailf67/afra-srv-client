import React, {Component} from 'react';
import {Form, Button, Col, FormControl, InputGroup} from 'react-bootstrap';
import {connect} from "react-redux";
import {dispatchActions} from "../../../../redux/actions";
import {ADD_TO_PRODUCTS_LIST} from "../../consts/actionsConstants";
import $ from "jquery";
import dynamic from "next/dynamic";


class AddHead extends Component {

    componentDidMount = () => {
        // this.props.fetchData('http://127.0.0.1/api/products/descriptions', PRODUCTS_DESCRIPTIONS)
    }

    updateCategorySelectBox = (newCategory) => {
        this.setState({
            category: newCategory.value
        });
    }

    submitForm = () => {
        let newProduct = {};
        //
        newProduct['part_number'] = $('#part-number').val();
        newProduct['description'] = $('#description').val();
        newProduct['category_id'] = $(document).find('select.category :selected').data('category-id');
        newProduct['category_title'] = $(document).find('select.category :selected').text();

        //check all fields filled
        let formFilled = true;
        $.each(newProduct, function (key, value) {
            if (!value || value == 0) {
                alert('پر کردن همه فیلدها الزامی است');
                formFilled = false;
                return false;
            }
        });
        console.log('asdasdasdadasdasdasdasdsadadads', newProduct)
        if (formFilled) {
            this.props.fetchData('http://127.0.0.1/api/products-list', ADD_TO_PRODUCTS_LIST, newProduct);
        }
    }


    render() {

        let {categories} = this.props;
        let categoryRow = [];
        if (categories) {
            categoryRow = categories.map((value, index) => {
                return [<option className="product-data" key={index} data-category-id={value.id}>{value.title}</option>]
            })
        }

        return (
            <Form>
                <Form.Row className="uncommon-inputs">
                    <Form.Group as={Col} controlId="categories">
                        <Form.Label>دسته بندی</Form.Label>
                        <select className="form-control category">
                            <option>Choose...</option>
                            {categoryRow}
                        </select>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>پارت نامبر</Form.Label>
                        <Form.Control type="text" id="part-number"/>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>توضیحات</Form.Label>
                        <Form.Control id="description"/>
                    </Form.Group>
                </Form.Row>
                <Button variant="primary" type="button" onClick={this.submitForm}>
                    Add New
                </Button>
            </Form>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url, actionType, data) => dispatch(dispatchActions(url, actionType, data)),
    }
}

export default connect(null, mapDispatchToProps)(AddHead);
