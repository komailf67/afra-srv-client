import React, {Component} from 'react';
import { InputGroup } from 'react-bootstrap';

class ProductsItem extends Component {
    render() {
        let {row, product} = this.props;
        return (
            <tr>
                <td>{row+1}</td>
                <td>{product.part_number}</td>
                <td>{product.categoryTitle}</td>
                <td>{product.description}</td>
                <td>{product.buy_price}</td>
                <td>{product.exist_count}</td>
                <td>{product.created_at}</td>
                <td>
                    <input type="checkbox" className="checked-product" data-product-id={product.id} />
                </td>
            </tr>
        )
    }
}
export default ProductsItem;