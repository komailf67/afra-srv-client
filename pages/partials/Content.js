import React, { Component } from "react";
import { Col, Card, Table } from 'react-bootstrap';

class Content extends Component {
    render() {
        let {title, children} = this.props;
        
        return (
            <Col sm={10} className="text-right">
                <Card >
                    <Card.Header>{title}</Card.Header>
                    <Card.Body>
                        {children}
                    </Card.Body >
                </Card>
            </Col>
        )
    }
}
export default Content;