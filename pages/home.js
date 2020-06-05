import React , { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import RightMenu from "./partials/menus/RightMenu";
import { Card , Container , Row , Col } from "react-bootstrap";
import './styles.css';

class Home extends Component {

  render(){
    return(
        <React.Fragment>
          <Container>
            <Row>
              <RightMenu />
              <Col sm={10} className="text-right">
                <Card >
                  <Card.Header>Content</Card.Header>
                  <Card.Body>
                    <h1>Home</h1>
                  </Card.Body >
                </Card>
              </Col>
            </Row>
          </Container>
        </React.Fragment>
    )
  }
}
export default Home;