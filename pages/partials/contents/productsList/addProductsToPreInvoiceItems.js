import React, {Component} from 'react';
import { Table, Form, Col, InputGroup, FormControl } from "react-bootstrap";
import $ from "jquery";

class AddProductsToPreInvoiceItems extends Component {

    componentDidMount = () => {
        let This = this;
        $('input#profit').change(function(){
           This.calculateSum();
        });
    }

    // constructor(props) {
    //     super(props);
    //
    //     this.state = {
    //         exist_count: '',
    //     }
    // }
    //
    // updateCategorySelectBox = (newCount) => {
    //     this.setState({
    //         exist_count: newCount.value
    //     });
    //     this.calculateSum();
    // }

    calculateSum = () => {
        let products = $('tr.product-for-sale');
    //     let acceptablePrice = 0;
        let sumInvoicePrice = 0;
        $.map(products, function (value, index) {
            let count = $(value).find('input.count').val();
            let price = $(value).find('input.price').val();
            let profit = $('input.profit').val();
            let sumSalePrice = ((1 + (Number(profit) )/100) * (price * count) ).toFixed(2);
            $(value).find('input.sum-sale-price').val(sumSalePrice);
    //         acceptablePrice = Number(acceptablePrice) + (Number(count) * Number(price) *1.30);
            sumInvoicePrice = (Number(sumInvoicePrice) + Number(sumSalePrice)).toFixed(2);
            // let eachProduct = {};
            // eachProduct['id'] = $(value).find('td.product-id').data('product-id');
            // eachProduct['count'] = $(value).find('select.exist_count').val();
            // eachProduct['price'] = $(value).find('td.buy-price').data('buy-price');
            // eachProduct['sumSalePrice'] = $(value).find('input.sum-sale-price').val();
            // sum.push(eachProduct)
        });

        $('#invoice-sum').val((sumInvoicePrice*1.09).toFixed(2));
    //     $('#acceptable-sum').val(acceptablePrice);
    }
    render() {
        let {row, product} = this.props;
        let exist_count = product.exist_count;
        let ExistCountRows = [];
        for (let index = 1; index <= exist_count; index++) {
            ExistCountRows.push(<option>{index}</option>)
        }
        return (
            <tr className="product-for-sale">
                <td className="product-id" data-product-id={product.id}>{row+1}</td>
                <td className="category" data-category-id={product.category_id} >{product.category_title}</td>
                <td className="part-number">{product.part_number}</td>
                <td className="description">{product.description}</td>
                <td>
                    <Form.Group as={Col}
                                onChange={this.calculateSum}
                    >
                        <Form.Control className="count" type="number" placeholder="" />
                    </Form.Group>
                </td>
                <td>
                    <Form.Group as={Col} onChange={this.calculateSum}>
                        <Form.Control className="price" type="number" placeholder="" />
                    </Form.Group>
                </td>
                <td>
                    <Form.Group as={Col}>
                        <Form.Control className="sum-sale-price" type="number" placeholder=""  disabled />
                    </Form.Group>
                </td>
            </tr>
        )
    }
}

export default AddProductsToPreInvoiceItems;