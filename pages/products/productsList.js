import React , { Component } from "react";
import RightMenu from "../partials/menus/RightMenu";
import Content from "../partials/Content";
import Head from "../partials/contents/productsList/productsListHead";
import {Container, Row } from "react-bootstrap";

class ProductsList extends Component {

    render(){
        return(
            <React.Fragment>
                <Container>
                    <Row>
                        <RightMenu />
                        <Content title="لیست کالاها">
                            <Head />
                        </Content>
                    </Row>
                </Container>
            </React.Fragment>
        )
    }
}
export default ProductsList;
