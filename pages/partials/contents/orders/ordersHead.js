import React, { Component } from 'react';
import { Table, Button } from "react-bootstrap";
import {connect} from "react-redux";
import OrdersItem from "./ordersItem";
import { products, dispatchActions, selectedProducts } from "../../../../redux/actions";
import {IS_OPEN_MODAL, ORDERS} from "../../consts/actionsConstants";
import OrderProductsModal from "./orderProductsModal";
import Loading from "../../../../Components/Loading/Loading";



class OrdersHead extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };
    }

    componentDidMount = () => {
        // this.props.fetchData('', IS_OPEN_MODAL, 1);
        this.props.fetchData('http://automation.afra.local/api/orders', ORDERS, '', localStorage.getItem('access_token'));
    }

    render() {
        let { orders, is_open_modal, orderDetails } = this.props;
        let orderRow = [];

        if (typeof orders === "undefined") {
            return <Loading/>
        }

        if (orders) {
            orderRow = orders.map((value, index) => {
                return [<OrdersItem key={index} row={index} order={value} />];
            });
        }
        let orderProductsModalComponent = [];
        if (is_open_modal) {
            orderProductsModalComponent = <OrderProductsModal is_open_modal={is_open_modal} orderDetails={orderDetails} />
        }

        return (
            <div id="orders">
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>ردیف</th>
                        <th>نام خریدار</th>
                        <th>شماره تماس</th>
                        <th>تاریخ</th>
                        <th>کالاها</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orderRow}
                    </tbody>
                </Table>
                <div className="App">
                    {orderProductsModalComponent}
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
        orders: state.orders.orders.data,
        is_open_modal: state.isOpenModal.is_open_modal,
        orderDetails: state.orders.orderDetails,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(OrdersHead);
