import React, { Component } from 'react';
import { Table, Button } from "react-bootstrap";
import {connect} from "react-redux";
import PreInvoicesItem from "./preInvoicesItem";
import { products, dispatchActions, selectedProducts } from "../../../../redux/actions";
import {
    CHECK_ORDERS_ACCESS,
    CHECK_PRE_INVOICES_ACCESS,
    IS_OPEN_MODAL,
    PRE_INVOICES
} from "../../consts/actionsConstants";
import Loading from "../../../../Components/Loading/Loading";
import PreInvoiceProductsModal from "./preInvoiceProductsModal";



class OrdersHead extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };
    }

    componentDidMount = () => {
        let token = localStorage.getItem('access_token');
        this.props.fetchData('http://automation.afra.local/api/access/check-access', CHECK_PRE_INVOICES_ACCESS, {'accessName': 'pre_invoices'}, localStorage.getItem('access_token'))
        this.props.fetchData('http://automation.afra.local/api/pre-invoices', PRE_INVOICES, '', token);
    }

    render() {
        let { preInvoices, is_open_modal, preInvoiceDetails, preInvoicesAccess } = this.props;

        if (typeof preInvoicesAccess === "undefined") {
            return <Loading/>
        } else if (typeof preInvoicesAccess === "boolean" && preInvoicesAccess === false) {
            return <h5>شما اجازه دسترسی به این صفحه را ندارید</h5>
        }

        let preInvoiceRow = [];

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
        fetchData: (url, actionType, data, token) => dispatch(dispatchActions(url, actionType, data, token)),
    }
}
const mapStateToProps = (state) => {
    return {
        preInvoices: state.preInvoices.preInvoices.data,
        is_open_modal: state.isOpenModal.is_open_modal,
        preInvoiceDetails: state.preInvoices.preInvoiceDetails,
        preInvoicesAccess: state.preInvoices.preInvoicesAccess
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(OrdersHead);
