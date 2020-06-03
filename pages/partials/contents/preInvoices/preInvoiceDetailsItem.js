import React, {Component} from 'react';

class PreInvoiceDetailsItem extends Component {

    render() {
        let {row, preInvoiceDetails} = this.props;
        return (
            <tr>
                <td>{row+1}</td>
                <td>{preInvoiceDetails.part_number}</td>
                <td>{preInvoiceDetails.category_title}</td>
                <td>{preInvoiceDetails.description}</td>
                <td>{preInvoiceDetails.count}</td>
                <td>{preInvoiceDetails.price}</td>
            </tr>
        )
    }
}

export default PreInvoiceDetailsItem;