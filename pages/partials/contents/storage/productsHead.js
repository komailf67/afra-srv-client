import React, { Component } from 'react';
import { Table, Button } from "react-bootstrap";
import {connect} from "react-redux";
import ProductsItem from "./productsItem";
import { products, dispatchActions, selectedProducts } from "../../../../redux/actions";
import {PRODUCTS, IS_OPEN_MODAL, SELECTED_PRODUCTS, CHECK_STORAGE_ACCESS} from "../../consts/actionsConstants";
import $ from "jquery";
import Modal, { ModalHeader, ModalBody, ModalFooter } from '../../modal/Modal.js';
import SaleModal from "../sales/saleModal";
import Loading from "../../../../Components/Loading/Loading";



class ProductsHead extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };
    }

    componentDidMount = () => {
        this.props.fetchData('http://automation.afra.local/api/access/check-access', CHECK_STORAGE_ACCESS, {'accessName': 'products'}, localStorage.getItem('access_token'))
        this.props.fetchData('http://automation.afra.local/api/products', PRODUCTS);
        this.props.fetchData('', IS_OPEN_MODAL, 0);

        let thisProps = this.props;
        $('button.btn-primary').click(function(){
            let selectedProductsId = [];
            $('input:checked').each(function () {
                selectedProductsId.push($(this).data('product-id'));
            });
            thisProps.fetchData('', SELECTED_PRODUCTS, selectedProductsId);
            thisProps.fetchData('', IS_OPEN_MODAL, 1);
        });
    }

    render() {
        let { products, is_open_modal, selectedProductsIds, storageAccess } = this.props;

        if (typeof storageAccess === "undefined") {
            return <Loading/>
        } else if (typeof storageAccess === "boolean" && storageAccess === false) {
            return <h5>شما اجازه دسترسی به این صفحه را ندارید</h5>
        }

        let productRow = [];

        if (products) {
            productRow = products.map((value, index) => {
                return [<ProductsItem key={index} row={index} product={value} />];
            });
        }
        let saleModalComponent = [];
        if (is_open_modal) {
            saleModalComponent = <SaleModal is_open_modal={is_open_modal} selectedProductsIds={selectedProductsIds} products={products} />
        }

        return (
            <div id="storage">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ردیف</th>
                            <th>PN</th>
                            <th>دسته بندی</th>
                            <th>نام محصول</th>
                            <th>قیمت خرید</th>
                            <th>تعداد موجود</th>
                            <th>تاریخ خرید</th>
                            <th>انتخاب</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productRow}
                    </tbody>
                </Table>
                <Button variant="primary">فروش</Button>{' '}
                <div className="App">
                    {saleModalComponent}
                </div>

            </div>
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
        products: state.products.products.data,
        is_open_modal: state.isOpenModal.is_open_modal,
        selectedProductsIds: state.sales.selectedProductsIds,
        storageAccess: state.products.storageAccess,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsHead);