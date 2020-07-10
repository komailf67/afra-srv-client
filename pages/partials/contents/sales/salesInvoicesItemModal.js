import React, {Component} from 'react';
import { Table, Form, Col, InputGroup, FormControl } from "react-bootstrap";
import $ from "jquery";
import SoldProductsItem from "./soldProductsItem";

class SalesInvoicesItemModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            exist_count: '',
        }
    }

    updateCategorySelectBox = (newCount) => {              
        this.setState({
            exist_count: newCount.value
        });
        this.calculateSum();
    }

    calculateSum = () => {
        let products = $('tr.product-for-sale');
        let acceptablePrice = 0;
        let sumInvoicePrice = 0;
        $.map(products, function (value, index) {

            let count = $(value).find('select.exist_count').val();
            let buyPrice = $(value).find('td.buy-price').data('buy-price');
            let sumSalePrice = $(value).find('input.sum-sale-price').val();

            acceptablePrice = Number(acceptablePrice) + (Number(count) * Number(buyPrice) *1.30);
            sumInvoicePrice = Number(sumInvoicePrice) + Number(sumSalePrice);
            // let eachProduct = {};            
            // eachProduct['id'] = $(value).find('td.product-id').data('product-id');
            // eachProduct['count'] = $(value).find('select.exist_count').val();
            // eachProduct['buyPrice'] = $(value).find('td.buy-price').data('buy-price');
            // eachProduct['sumSalePrice'] = $(value).find('input.sum-sale-price').val();
            // sum.push(eachProduct)
        });
        $('#invoice-sum').val(sumInvoicePrice);
        $('#acceptable-sum').val(acceptablePrice);
    }
    render() {
        let {row, product} = this.props;
        let exist_count = product.exist_count;
        let ExistCountRows = [];
        for (let index = 1; index <= exist_count; index++) {
            ExistCountRows.push(<option>{index}</option>)
        }

        let serialRows = [];
        if (product.serials.length > 0) {
            serialRows = product.serials.map((value, index) => {
                return [
                    <div>
                        <input type="checkbox" id={`${product.id}`+ index} />
                        <label htmlFor={`${product.id}`+ index}> {value.serial_number} </label>
                    </div>
                    ];
            });
        }
        return (
            <tr className="product-for-sale">
                <td className="product-id" data-product-id={product.id}>
                    {product.id}
                </td>
                <td>
                    {product.categoryTitle}
                </td>
                <td>
                    {product.description}
                </td>
                <td className="buy-price" data-buy-price={product.buy_price}>
                    {product.buy_price}
                </td>
                <td>
                    <Form.Group as={Col}>
                        <Form.Control className="exist_count" as="select" value={this.state.exist_count} onChange={this.updateCategorySelectBox}>
                            {ExistCountRows}
                        </Form.Control>
                    </Form.Group>
                </td>
                <td style={{'direction': 'ltr'}}>
                    {serialRows}
                </td>
                <td>
                    <Form.Group as={Col}
                    onChange={this.calculateSum}
                    >
                        <Form.Control className="sum-sale-price" type="text" placeholder="" />
                    </Form.Group>    
                </td>
            </tr>
        )
    }
}

export default SalesInvoicesItemModal;