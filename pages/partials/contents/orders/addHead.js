import React, {Component} from 'react';
import {Form, Container, Row, Button, Card, ListGroup, Col} from 'react-bootstrap';
import {connect} from "react-redux";
import {products, dispatchActions} from "../../../../redux/actions";
import {
    CATEGORIES,
    ADD_ORDERS,
    IS_FORM_SUBMITTED,
    PRODUCTS_DESCRIPTIONS, CHECK_ORDERS_ACCESS
} from "../../consts/actionsConstants";
import $ from "jquery";
import dynamic from "next/dynamic";
import Autocomplete from "../../Autocomplete";
import Loading from "../../../../Components/Loading/Loading";
const DatePicker = dynamic(()=> import('react-datepicker2'),{ssr:false})
const momentJalaali = dynamic(()=> import('moment-jalaali'),{ssr:false})

class AddHead extends Component {

    constructor(props) {
        super(props);

        this.state = {
            category: '',
            value: '',
        }
    }

    updateCategorySelectBox = (newCategory) => {
        this.setState({
            category: newCategory.value
        });
    }

    componentDidMount = () => {
        this.props.fetchData('http://automation.afra.local/api/access/check-access', CHECK_ORDERS_ACCESS, {'accessName': 'orders'}, localStorage.getItem('access_token'))
        this.props.fetchData('http://automation.afra.local/api/categories', CATEGORIES)
        this.props.fetchData('http://automation.afra.local/api/products/descriptions', PRODUCTS_DESCRIPTIONS)
        //START jquery functions
        //delete row
        $(document).on('click', '.btn-danger', function () {
          $(this).parents('.uncommon-inputs').remove();
        })
        //END jquery functions
    }

    componentDidUpdate = () => {
        if (this.props.isFormSubmitted) {
            this.resetForm()
        }
    }

    addNewProductInputs = () => {
        let uncommonInputs = $(".uncommon-inputs");
        $(uncommonInputs[0]).clone().insertAfter(uncommonInputs[0]);
        $(document).find('button.new-product').each(function (index, value) {
          if (index > 0) {
            $(this).removeClass('btn-success').addClass('btn-danger');
            $(this).html('-');
          }
        });
    }

    submitForm = () => {
        let buyerDetails = {};
        buyerDetails['buyerName'] = $('#seller').val();
        buyerDetails['phoneNumber'] = $('#phone-number').val();

        let newOrder = new Array();
        $(".uncommon-inputs").each(function () {
            let item = {};

            item['category-id'] = $(this).find('select.category :selected').data('category-id');
            item['description'] = $(this).find('input.description').val();
            item['count'] = $(this).find('input.count').val();

            newOrder.push(item);
        });

        let orders = {};
        orders['commonDetails'] = buyerDetails;
        orders['uncommonDetails'] = newOrder;

        let formFilled = true;
        $.each(buyerDetails, function (key, value) {
            if (!value || value == 0) {
                alert('پر کردن همه فیلدها الزامی است');
                formFilled = false;
                return false;
            }
        });

        if (formFilled) {
            this.props.fetchData('http://automation.afra.local/api/orders', ADD_ORDERS, orders, localStorage.getItem('access_token'));
        }

    }

    resetForm = () => {
        if (this.props.isFormSubmitted) {
            alert('سفارش با موفقیت اضافه شد');
            $('.btn-danger').parents('.uncommon-inputs').remove();
            $('form').find("input").val("");
            $('#categories').prop('selectedIndex',0);
            this.props.fetchData('', IS_FORM_SUBMITTED, false)
        }
    }

    render() {
        let {categories, productsDescriptions, ordersAccess} = this.props;

        if (typeof ordersAccess === "undefined") {
            return <Loading/>
        } else if (typeof ordersAccess === "boolean" && ordersAccess === false) {
            return <h5>شما اجازه دسترسی به این صفحه را ندارید</h5>
        }

        let categoryRow = [];
        if (categories) {
            categoryRow = categories.map((value, index) => {
                return [<option className="product-data" key={index} data-category-id={value.id}>{value.title}</option>]
            })
        }
        return (
            <Form>
                <Form.Row>
                    <Form.Group as={Col} className="input" controlId="seller">
                        <Form.Label>نام خریدار</Form.Label>
                        <Form.Control type="text" placeholder=""/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="phone-number">
                        <Form.Label>شماره تماس</Form.Label>
                        <Form.Control type="number" placeholder=""/>
                    </Form.Group>
                </Form.Row>
                <Form.Row className="uncommon-inputs">
                    <Form.Group as={Col} controlId="categories">
                        <Form.Label>دسته بندی</Form.Label>
                        <div className="d-flex">
                            <Button className="ml-1 new-product"
                                    onClick={(event) => {
                                        this.addNewProductInputs()
                                    }}
                                    variant="success">+</Button>{' '}
                            <Form.Control className="category" as="select" value={this.state.category}
                                          onChange={this.updateCategorySelectBox}>
                                <option>Choose...</option>
                                {categoryRow}
                            </Form.Control>
                        </div>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>توضیح مدل</Form.Label>
                        {/*//TODO autocomplete after add new input*/}
                        <Autocomplete
                            suggestions={productsDescriptions}
                        />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>تعداد</Form.Label>
                        <Form.Control type="number" className="count"/>
                    </Form.Group>
                </Form.Row>
                <Button variant="primary" type="button" onClick={this.submitForm}>
                    Submit
                </Button>
            </Form>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url, actionType, data, token) => dispatch(dispatchActions(url, actionType, data, token)),
    }
}
const mapStateToProps = (state) => {
    return {
        categories: state.categories.categories.data,
        isFormSubmitted: state.formReducer.isFormSubmitted,
        productsDescriptions: state.products.productsDescriptions.data,
        ordersAccess: state.orders.ordersAccess
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddHead);
