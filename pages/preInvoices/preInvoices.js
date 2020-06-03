import React , { Component } from "react";
import RightMenu from "../partials/menus/RightMenu";
import Content from "../partials/Content";
import Head from "../partials/contents/preInvoices/preInvoicesHead";
import {Container, Row } from "react-bootstrap";

class Orders extends Component {

    render(){
        return(
            <React.Fragment>
                <Container>
                    <Row>
                        <RightMenu />
                        <Content title="پیش فاکتورها">
                            <Head />
                        </Content>
                    </Row>
                </Container>
            </React.Fragment>
        )
    }
}
export default Orders;
