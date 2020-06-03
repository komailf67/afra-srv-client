import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import {dispatchActions} from "../../../../redux/actions";
import {connect} from "react-redux";
import {IS_OPEN_MODAL, SHOW_ONE_ORDER_DETAILS} from "../../consts/actionsConstants";

class OrdersItem extends Component {

    showProducts = () => {
        let orderId = this.props.order.id;
        this.props.fetchData(`http://127.0.0.1/api/orders/${orderId}`, SHOW_ONE_ORDER_DETAILS);
        this.props.fetchData('', IS_OPEN_MODAL, 1);
    }

    render() {
        let {row, order} = this.props;
        return (
            <tr>
                <td>{row + 1}</td>
                <td>{order.buyer_name}</td>
                <td>{order.phone_number}</td>
                <td>{order.created_at}</td>
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

export default connect(null, mapDispatchToProps)(OrdersItem);
