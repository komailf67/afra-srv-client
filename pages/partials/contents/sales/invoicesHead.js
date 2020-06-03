import React, {Component} from "react";
import {connect} from "react-redux";
import {dispatchActions} from "../../../../redux/actions";
import {Table} from "react-bootstrap";
import {SALES_INVOICES} from "../../consts/actionsConstants";
import SalesInvoicesItem from "./salesInvoicesItem";
import $ from "jquery";
import SaleInvoiceModal from "./saleInvoiceModal";

class InvoicesHead extends Component {
    componentDidMount() {
        this.props.fetchData('http://127.0.0.1/api/sales/invoices', SALES_INVOICES);
    }

    render() {
        let {saleInvoices, saleInvoiceId, is_open_modal} = this.props;
        let salesRow = [];
        if (saleInvoices) {
            salesRow = saleInvoices.map((value, index) => {
                return [<SalesInvoicesItem key={index} row={index} saleInvoice={value}/>];
            });
        }

        let saleInvoiceModalComponent = [];
        if (saleInvoiceId && is_open_modal) {
            let selectedInvoice = {};
            saleInvoices.map(item => {
                if (item.id == saleInvoiceId) {
                    selectedInvoice = item;
                }
            });
            saleInvoiceModalComponent =
                <SaleInvoiceModal selectedInvoice={selectedInvoice} is_open_modal={is_open_modal}/>
        }

        return (
            <div id="sale-invoices">
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>ردیف</th>
                        <th>شماره فاکتور</th>
                        <th>نام خریدار</th>
                        <th>شماره تماس</th>
                        <th>گارانتی</th>
                        <th>بیمه</th>
                        <th>تاریخ فروش</th>
                        <th>تاریخ ثبت</th>
                        <th>تاخیر</th>
                        <th>مبلغ فاکتور</th>
                        <th>نمایش فاکتور</th>
                    </tr>
                    </thead>
                    <tbody>
                    {salesRow}
                    </tbody>
                </Table>
                <div className="App">
                    {saleInvoiceModalComponent}
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url, actionType) => dispatch(dispatchActions(url, actionType)),
    }
}
const mapStateToProps = (state) => {
    return {
        saleInvoices: state.sales.salesInvoices.data,
        is_open_modal: state.isOpenModal.is_open_modal,
        saleInvoiceId: state.sales.saleInvoiceId
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InvoicesHead);
