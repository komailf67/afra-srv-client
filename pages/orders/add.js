import React, * as react from "react";
import { Form, Container, Row, Button, Card, ListGroup, Col } from 'react-bootstrap';
import $ from 'jquery';
import RightMenu from "../partials/menus/RightMenu";
import Content from "../partials/Content";
import AddHead from "../partials/contents/orders/addHead";

class Add extends react.Component {
  render() {
    return (
      <React.Fragment>
        <Container>
          <Row>
            <RightMenu />
            <Content title="ثبت سفارش" >
              <AddHead />  
            </Content>
          </Row>
        </Container>
      </React.Fragment>
    )
  }
}

export default Add;