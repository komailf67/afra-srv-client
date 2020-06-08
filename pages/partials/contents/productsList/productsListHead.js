import React, {Component} from 'react';
import {Table, Button} from "react-bootstrap";
import {connect} from "react-redux";
import ProductsListItem from "./productsListItem";
import {dispatchActions} from "../../../../redux/actions";
import {
    CATEGORIES,
    MESSAGE_SHOWED,
    PRODUCTS_LIST, SELECTED_PRODUCTS_LIST_FOR_PRE_INVOICE,
    SELECTED_PRODUCTS_LIST_FOR_STORAGE
} from "../../consts/actionsConstants";
import AddHead from "./addHead";
import $ from "jquery";
import AddProductsToStorageModal from "./addProductsToStorageModal";
import AddProductsToPreInvoiceModal from "./addProductsToPreInvoiceModal";

class productsListHead extends Component {

    constructor(props) {
        super(props);

        this.state = {
            buttonClicked: '',
        }
    }

    componentDidMount = () => {
        this.props.fetchData('http://automation.afra.local/api/categories', CATEGORIES)
        this.props.fetchData('http://automation.afra.local/api/products-list', PRODUCTS_LIST);

        let This = this;
        $('button.add-to-storage').click(function () {
            This.setState({
                buttonClicked: 'to-storage'
            });
            let productsId = [];
            $('input:checked').each(function () {
                productsId.push($(this).data('product-id'));
            });
            let selectedProducts = {};
            selectedProducts['productsIds'] = JSON.stringify(productsId);
            This.props.fetchData('http://automation.afra.local/api/products-list/products', SELECTED_PRODUCTS_LIST_FOR_STORAGE, selectedProducts);
        });

        $('button.add-to-pre-invoice').click(function () {
            This.setState({
                buttonClicked: 'to-pre-invoice'
            });
            let productsId = [];
            $('input:checked').each(function () {
                productsId.push($(this).data('product-id'));
            });
            let selectedProducts = {};
            selectedProducts['productsIds'] = JSON.stringify(productsId);
            This.props.fetchData('http://automation.afra.local/api/products-list/products', SELECTED_PRODUCTS_LIST_FOR_PRE_INVOICE, selectedProducts);
        });
    }

    render() {
        let {productsList, categories, newProductsList, messageShowed, is_open_modal, selectedProducts, selectedProductsForPreInvoice} = this.props;
        let productsRow = [];
        if (productsList) {
            productsRow = productsList.map((value, index) => {
                return [<ProductsListItem key={index} row={index} products={value}/>];
            });
        }

        if (newProductsList) {
            let {message, success} = newProductsList;

            if (!messageShowed) {
                // alert(message);
                this.props.fetchData('', MESSAGE_SHOWED, 1);
            }
            if (success) {
                $('form').find("input").val("");
                $('#category').prop('selectedIndex', 0);
            }
        }

        let addProductToStorageModal = [];
        if (is_open_modal && selectedProducts && this.state.buttonClicked == 'to-storage') {
            addProductToStorageModal = <AddProductsToStorageModal is_open_modal={is_open_modal}
                                                                  selectedProducts={selectedProducts}
            />
        }
        if (is_open_modal && selectedProductsForPreInvoice && this.state.buttonClicked == 'to-pre-invoice') {
            addProductToStorageModal = <AddProductsToPreInvoiceModal is_open_modal={is_open_modal}
                                                                  selectedProducts={selectedProductsForPreInvoice}
            />
        }

        return (
            <div id="products-list">
                <AddHead categories={categories}/>
                <Table className="mt-3" striped bordered hover>
                    <thead>
                    <tr>
                        <th>ردیف</th>
                        <th>دسته بندی</th>
                        <th>پارت نامبر</th>
                        <th>توضیحات</th>
                        <th>عملیات</th>
                    </tr>
                    </thead>
                    <tbody>
                    {productsRow}
                    </tbody>
                </Table>
                <Button className="add-to-storage" variant="primary">افزودن به انبار</Button>{' '}
                <Button className="add-to-pre-invoice" variant="info">ثبت پیش فاکتور</Button>{' '}
                <div className="App">
                    {addProductToStorageModal}
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url, actionType, data) => dispatch(dispatchActions(url, actionType, data)),
    }
}
const mapStateToProps = (state) => {
    return {
        categories: state.categories.categories.data,
        productsList: state.productsList.productsList.data,
        newProductsList: state.productsList.newProductsList,
        messageShowed: state.messageShowed.messageShowed,
        is_open_modal: state.isOpenModal.is_open_modal,
        selectedProducts: state.productsList.selectedProducts,
        selectedProductsForPreInvoice: state.productsList.selectedProductsForPreInvoice,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(productsListHead);