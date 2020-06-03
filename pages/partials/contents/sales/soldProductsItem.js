import React, {Component} from 'react';

class SoldProductsItem extends Component {
    render() {
        let {row, soldProduct} = this.props;
        return (
            <tr>
                <td>{row + 1}</td>
                <td>{soldProduct.id}</td>
                <td>{soldProduct.category_title}</td>
                <td>{soldProduct.description}</td>
                <td>{soldProduct.count}</td>
                <td>{soldProduct.buy_price}</td>
                <td>{Math.round(Number(soldProduct.total_amount)/Number(soldProduct.count))}</td>
                <td>{soldProduct.buy_invoice_id}</td>
                <td>{soldProduct.saleInvoice_id}</td>
                <td>{soldProduct.customer_name}</td>
                <td>{soldProduct.buy_date}</td>
                <td>{soldProduct.sale_date}</td>
            </tr>
        )
    }
}

export default SoldProductsItem;