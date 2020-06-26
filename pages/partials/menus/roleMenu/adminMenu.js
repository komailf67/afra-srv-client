import React, {Component} from "react";
import {Card, ListGroup, Col} from "react-bootstrap";
import Router from 'next/router'
import axios from 'axios';

class AdminMenu extends Component {

    logout = () => {
        let token = localStorage.getItem('access_token');
        let config = {
            headers: {'Authorization': "bearer " + token}
        };
        //TODO
        axios.get(
            'http://automation.afra.local/api/logout',
            config
        ).then(response => {
            let {success, message} = response.data;
            window.location.replace("/");
        }).catch(error => {

        });
    }
    render() {
        const onClickHandler = (href) => {
            return e => {
                e.preventDefault()
                Router.push(href)
            }
        }

        const Link = ({children, href}) => (
            <a href="#" onClick={onClickHandler(href)}>
                {children}
                <style jsx>{`
                a {
                  margin-right: 10px;
                }
              `}</style>
            </a>
        )
        return (
            <Col sm={2} className="text-right">
                <Card>
                    <Card.Header>منو</Card.Header>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <Link href="/">Home</Link>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Link href="/orders/add">ثبت سفارش</Link>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Link href="/orders/orders">لیست سفارشات</Link>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Link href="/products/productsList">لیست کالاها</Link>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Link href="/preInvoices/preInvoices">پیش فاکتورها</Link>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Link href="/storage/products">انبار</Link>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Link href="/storage/add">اضافه کردن محصول</Link>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Link href="/sales/products">محصولات فروخته شده</Link>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Link href="/sales/invoices">فاکتورهای فروش</Link>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Link href="/categories/categories">دسته بندی ها</Link>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Link href="/users/manage-users">مدیریت کاربران</Link>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h6
                                style={{'paddingRight': '10px', 'cursor': 'pointer', 'color': 'red'}}
                                onClick={this.logout}
                            >خروج</h6>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        )
    }
}

export default AdminMenu;