import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import {dispatchActions} from "../../../../redux/actions";
import {connect} from "react-redux";
import {IS_OPEN_MODAL, SHOW_ONE_ORDER_DETAILS} from "../../consts/actionsConstants";

class OrdersItem extends Component {

    showProducts = () => {
        let orderId = this.props.order.id;
        console.log('rtrtrtrtrt', localStorage.getItem('access_token'))
        this.props.fetchData(`http://automation.afra.local/api/orders/${orderId}`, SHOW_ONE_ORDER_DETAILS, '', localStorage.getItem('access_token'));
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
        fetchData: (url, actionType, data, token) => dispatch(dispatchActions(url, actionType, data, token)),
    }
}

export default connect(null, mapDispatchToProps)(OrdersItem);
