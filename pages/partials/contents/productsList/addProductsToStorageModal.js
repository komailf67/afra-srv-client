import React, { Component } from 'react';
import {connect} from "react-redux";
import {ADD_TO_STORAGE, IS_OPEN_MODAL, SALE_PRODUCTS} from "../../consts/actionsConstants";
import { dispatchActions, selectedProducts } from "../../../../redux/actions";
import { Table, Form, Col, InputGroup, FormControl } from "react-bootstrap";
import $ from "jquery";
import AddProductsToStorageItems from "./addProductsToStorageItems";
import Modal, { ModalHeader, ModalBody, ModalFooter } from '../../modal/Modal.js';
import dynamic from "next/dynamic";
const DatePicker = dynamic(()=> import('react-datepicker2'),{ssr:false});
const momentJalaali = dynamic(()=> import('moment-jalaali'),{ssr:false});


class AddProductsToStorageModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            category: '',
            value: '',
        }
    }

    componentDidMount = () => {
        let This = this;
        $('button.btn-success').click(function () {
            let commonDetails = {};
            commonDetails['sellerName'] = $('#seller').val();
            commonDetails['phoneNumber'] = $('#phone-number').val();
            commonDetails['date'] = $('.datepicker-input').val();
            commonDetails['amount'] = $('#invoice-sum').val();

            let products = $('tr.product-for-sale');
            let productsDetails = [];
            $.map(products, function (value, index) {
                let eachProduct = {};
                eachProduct['id'] = $(value).find('td.product-id').data('product-id');
                eachProduct['category_id'] = $(value).find('td.category').data('category-id');
                eachProduct['part_number'] = $(value).find('td.part-number').text();
                eachProduct['description'] = $(value).find('td.description').text();
                eachProduct['count'] = $(value).find('input.count').val();
                eachProduct['price'] = $(value).find('input.price').val();
                eachProduct['serials'] = $(value).find('textarea.serials').val();
                productsDetails.push(eachProduct)
            });
            let productsToAdd = {};
            productsToAdd['commonDetails'] = commonDetails;
            productsToAdd['uncommonDetails'] = productsDetails;
            console.log('baggggggggggggggggg',productsToAdd)
            This.props.fetchData('http://127.0.0.1/api/products-list/add-to-storage', ADD_TO_STORAGE, productsToAdd);
        });
    }

    toggle = () => {
        this.props.fetchData('', IS_OPEN_MODAL, 0);
    }

    render() {
        let { is_open_modal, selectedProducts } = this.props;
        let selectedProductsRows = selectedProducts.data.map((value, index) => {
            // if (selectedProductsIds.indexOf(value.id) !== -1) {
                return [<AddProductsToStorageItems key={index} row={index} product={value} />]
            // }
        });

        return (
            <Modal dialogClassName="my-modal" isOpen={is_open_modal} scrollable={true}>
                <ModalHeader>
                    <h3>فاکتور شماره</h3>
                </ModalHeader>
                <ModalBody style={{'maxHeight': 'calc(100vh - 210px)', 'overflowY': 'auto'}}>
                    <Form>
                        <Form.Row>
                            <Form.Group as={Col} className="input" controlId="seller">
                                <Form.Label>نام فروشنده</Form.Label>
                                <Form.Control type="text" placeholder="" />
                            </Form.Group>
                            <Form.Group as={Col} controlId="phone-number">
                                <Form.Label>شماره تماس</Form.Label>
                                <Form.Control type="tel" placeholder="" />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>تاریخ خرید</Form.Label>
                                <DatePicker
                                    className="form-control"
                                    isGregorian={false}
                                    value={this.state.value}
                                    onChange={value => this.setState({ value })}
                                />
                            </Form.Group>
                        </Form.Row>
                    </Form>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ردیف</th>
                                <th>دسته بندی</th>
                                <th>پارت نامبر</th>
                                <th>شرح کالا</th>
                                <th>تعداد</th>
                                <th>قیمت واحد</th>
                                <th>شماره سریال</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedProductsRows}
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>مجموع فاکتور</td>
                                <td>
                                    <input id="invoice-sum" value="" disabled/>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </ModalBody>
                <ModalFooter>
                <button
                    type="button"
                    className="btn btn-success"
                >
                    فروش
                </button>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={this.toggle}
                >
                    لغو
                </button>
                </ModalFooter>
            </Modal>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url, actionType, data) => dispatch(dispatchActions(url, actionType, data)),
    }
}

export default connect(null, mapDispatchToProps)(AddProductsToStorageModal);
