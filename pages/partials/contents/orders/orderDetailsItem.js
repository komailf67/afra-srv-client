import React, {Component} from 'react';

class OrderDetailsItem extends Component {

    render() {
        let {row, orderDetails} = this.props;
        return (
            <tr>
                <td>{row+1}</td>
                <td>{orderDetails.category_title}</td>
                <td>{orderDetails.description}</td>
                <td>{orderDetails.count}</td>
            </tr>
        )
    }
}

export default OrderDetailsItem;