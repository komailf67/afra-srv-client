import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import {dispatchActions} from "../../../../redux/actions";
import {connect} from "react-redux";
import {IS_OPEN_MODAL, SHOW_ONE_PRE_INVOICE_DETAILS} from "../../consts/actionsConstants";

class PreInvoicesItem extends Component {

    showProducts = () => {
        let preInvoiceId = this.props.preInvoice.id;
        this.props.fetchData(`http://automation.afra.local/api/pre-invoices/${preInvoiceId}`, SHOW_ONE_PRE_INVOICE_DETAILS);
        this.props.fetchData('', IS_OPEN_MODAL, 1);
    }

    render() {
        let {row, preInvoice} = this.props;
        return (
            <tr>
                <td>{row + 1}</td>
                <td>{preInvoice.buyer_name}</td>
                <td>{preInvoice.phone_number}</td>
                <td>{preInvoice.dollar}</td>
                <td>{preInvoice.profit}</td>
                <td>'TODO'</td>
                <td>{preInvoice.date}</td>
                <td>
                    <Button variant="primary" type="button" size="sm" onClick={this.showProducts}>
                        نمایش
                    </Button>
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

export default connect(null, mapDispatchToProps)(PreInvoicesItem);
