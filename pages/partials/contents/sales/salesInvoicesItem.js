import React, {Component} from 'react';
import { Button } from "react-bootstrap";
import $ from "jquery";
import {IS_OPEN_MODAL, SALE_INVOICE_TO_SHOW} from "../../consts/actionsConstants";
import {connect} from "react-redux";
import {dispatchActions} from "../../../../redux/actions";

class SalesInvoicesItem extends Component {
    // componentDidMount = () => {
    //
    //     // let thisProps = this.props;
    //     // $('button.btn-primary').click(function(){
    //         // let selectedProductsId = [];
    //         // $('input:checked').each(function () {
    //         //     selectedProductsId.push($(this).data('product-id'));
    //         // });
    //         // thisProps.fetchData('', SELECTED_PRODUCTS, selectedProductsId);
    //         // thisProps.fetchData('', IS_OPEN_MODAL, 1);
    //     // });
    // }

    showInvoice = () => {
        let invoiceId = this.props.saleInvoice.id;
        this.props.fetchData('', SALE_INVOICE_TO_SHOW, invoiceId);
        this.props.fetchData('', IS_OPEN_MODAL, 1);
    }

    render() {
        let {row, saleInvoice} = this.props;
        return (
            <tr>
                <td>{row + 1}</td>
                <td>{saleInvoice.id}</td>
                <td>{saleInvoice.customer_name}</td>
                <td>{saleInvoice.customer_number}</td>
                <td>{saleInvoice.has_guarantee}</td>
                <td>{saleInvoice.has_assurance}</td>
                <td>{saleInvoice.date}</td>
                <td>{saleInvoice.created_at}</td>
                <td>۰</td>
                <td>{saleInvoice.amount}</td>
                <td>
                    <Button
                        onClick={this.showInvoice}
                        variant="primary" size="sm">
                        نمایش
                    </Button>{' '}
                </td>
            </tr>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url, actionType, data) => dispatch(dispatchActions(url, actionType, data)),
    }
}

export default connect(null, mapDispatchToProps)(SalesInvoicesItem);
