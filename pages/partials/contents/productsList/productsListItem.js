import React, {Component} from 'react';

class ProductsListItem extends Component {

    render() {
        let {row, products} = this.props;
        return (
            <tr>
                <td>{row+1}</td>
                <td>{products.category_title}</td>
                <td>{products.part_number}</td>
                <td>{products.description}</td>
                <td>
                    <input type="checkbox" className="checked-product" data-product-id={products.id} />
                </td>
            </tr>
        )
    }
}

export default ProductsListItem;
