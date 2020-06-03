import React, { Component } from 'react';
import { Table, Button } from "react-bootstrap";
import {connect} from "react-redux";
import PreInvoicesItem from "./preInvoicesItem";
import { products, dispatchActions, selectedProducts } from "../../../../redux/actions";
import {IS_OPEN_MODAL, PRE_INVOICES} from "../../consts/actionsConstants";
import PreInvoiceProductsModal from "./preInvoiceProductsModal";



class OrdersHead extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };
    }

    componentDidMount = () => {
        this.props.fetchData('http://127.0.0.1/api/pre-invoices', PRE_INVOICES);
    }

    render() {
        let { preInvoices, is_open_modal, preInvoiceDetails } = this.props;
        let preInvoiceRow = [];
        console.log('sdfdsfsdfdsfdsfsdfdsfds', preInvoiceDetails)

        if (preInvoices) {
            preInvoiceRow = preInvoices.map((value, index) => {
                return [<PreInvoicesItem key={index} row={index} preInvoice={value} />];
            });
        }
        let preInvoiceProductsModalComponent = [];
        if (is_open_modal) {
            preInvoiceProductsModalComponent = <PreInvoiceProductsModal is_open_modal={is_open_modal} preInvoiceDetails={preInvoiceDetails} />
        }

        return (
            <div id="orders">
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>ردیف</th>
                        <th>نام خریدار</th>
                        <th>شماره تماس</th>
                        <th>قیمت دلار</th>
                        <th>سود</th>
                        <th>نام کاربر</th>
                        <th>تاریخ</th>
                        <th>کالاها</th>
                    </tr>
                    </thead>
                    <tbody>
                    {preInvoiceRow}
                    </tbody>
                </Table>
                <div className="App">
                    {preInvoiceProductsModalComponent}
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
        preInvoices: state.preInvoices.preInvoices.data,
        is_open_modal: state.isOpenModal.is_open_modal,
        preInvoiceDetails: state.preInvoices.preInvoiceDetails,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(OrdersHead);
