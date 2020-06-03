import React, {Component} from 'react';
import {connect} from "react-redux";
import {IS_OPEN_MODAL, SALE_PRODUCTS} from "../../consts/actionsConstants";
import {dispatchActions, selectedProducts} from "../../../../redux/actions";
import {Table, Form, Col, InputGroup, FormControl} from "react-bootstrap";
import $ from "jquery";
import SalesInvoicesItemModal from "./salesInvoicesItemModal";
import Modal, {ModalHeader, ModalBody, ModalFooter} from '../../modal/Modal.js';
import dynamic from "next/dynamic";

const DatePicker = dynamic(() => import('react-datepicker2'), {ssr: false});
const momentJalaali = dynamic(() => import('moment-jalaali'), {ssr: false});


class SaleInvoiceModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            category: '',
            value: '',
        }
    }

    componentDidMount = () => {
        console.log('asdasdassadassdfsdfggfdgdfgdfhfghgfhfghgffg')
        // let This = this;
        // $('button.btn-success').click(function () {
        //     let commonDetails = {};
        //     commonDetails['buyerName'] = $('#seller').val();
        //     commonDetails['phoneNumber'] = $('#phone-number').val();
        //     commonDetails['guarantee'] = $('#guarantee').val();
        //     commonDetails['assurance'] = $('#assurance').val();
        //     commonDetails['date'] = $('.datepicker-input').val();
        //     commonDetails['amount'] = $('#invoice-sum').val();
        //
        //     let products = $('tr.product-for-sale');
        //     let productsDetails = [];
        //     $.map(products, function (value, index) {
        //         let eachProduct = {};
        //         eachProduct['id'] = $(value).find('td.product-id').data('product-id');
        //         eachProduct['count'] = $(value).find('select.exist_count').val();
        //         eachProduct['total_amount'] = $(value).find('input.sum-sale-price').val();
        //         eachProduct['buyPrice'] = $(value).find('td.buy-price').data('buy-price');
        //         eachProduct['sumSalePrice'] = $(value).find('input.sum-sale-price').val();
        //         productsDetails.push(eachProduct)
        //     });
        //     let soldProducts = {};
        //     soldProducts['commonDetails'] = commonDetails;
        //     soldProducts['uncommonDetails'] = productsDetails;
        //     This.props.fetchData('http://127.0.0.1/api/sales', SALE_PRODUCTS, soldProducts);
        // });
    }

    toggle = () => {
        this.props.fetchData('', IS_OPEN_MODAL, 0);
    }

    render() {
        let {selectedInvoice, is_open_modal} = this.props;
        console.log('aliiiiiiiiiiiiiiiiiii', selectedInvoice)
        let soldProducts = selectedInvoice.products.map((value, index) => {
            return [<SalesInvoicesItemModal key={index} row={index} product={value}/>]
        });

        return (
            <Modal dialogClassName="my-modal" isOpen={is_open_modal}>
                <ModalHeader>
                    <h3> شماره فاکتور : {selectedInvoice.id}</h3>
                </ModalHeader>
                <ModalBody>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>ردیف</th>
                            <th>عنوان محصول</th>
                            <th>مشخصات</th>
                            <th>تعداد</th>
                            <th>قیمت هر عدد</th>
                            <th>قیمت مجموع</th>
                        </tr>
                        </thead>
                        <tbody>
                        {soldProducts}
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
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>مجموع قابل قبول</td>
                            <td>
                                <input id="acceptable-sum" value="" disabled/>
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

export default connect(null, mapDispatchToProps)(SaleInvoiceModal);
