import React, {Component} from "react";
import {Form, Col, Button, Card} from "react-bootstrap";
import axios from 'axios';
import $ from "jquery";

class Login extends Component {
    componentDidMount = () => {
        let token = localStorage.getItem('access_token');
        // let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjFcL2FwaVwvbG9naW4iLCJpYXQiOjE1OTExODEyNjQsImV4cCI6MTU5MTE4NDg2NSwibmJmIjoxNTkxMTgxMjY1LCJqdGkiOiJRQnJXVFVOV2FRYW9sRWowIiwic3ViIjoxLCJwcnYiOiI4N2UwYWYxZWY5ZmQxNTgxMmZkZWM5NzE1M2ExNGUwYjA0NzU0NmFhIn0.eBW5u-Q_VUh6eLIhKQaYQQbGhzG1FlaSasLW0XeCgxI';
        let config = {
            headers: {'Authorization': "bearer " + token}
        };
        //TODO error messages
    }

    login = () => {
        axios.post('http://automation.afra.local/api/login', {
            email: $('#email').val(),
            password: $('#password').val(),
            // role: $('#roles').val()
        })
            .then(response => {
                console.log('eeeeeeeeeeeeeeee', response)
                let {success, message, token, role} = response.data;
                localStorage.setItem('access_token', token);
                localStorage.setItem('role', role);
                window.location.replace("/");
            }).catch(error => {
        })
    };

    register = () => {
        window.location.replace("/auth/register");
    }

    render() {
        return (
            <Col className="text-right">
                <Card className="loginCenter">
                    <Card.Header>ورود</Card.Header>
                    <Card.Body>
                        <Form>
                            <Form.Group as={Col} controlId="email">
                                <Form.Label>ایمیل</Form.Label>
                                <Form.Control type="email" placeholder="Enter email"/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="password">
                                <Form.Label>پسورد</Form.Label>
                                <Form.Control type="password" placeholder="Password"/>
                            </Form.Group>

                            <Button variant="primary" type="button" onClick={() => {
                                this.login()
                            }}>
                                Submit
                            </Button>
                        </Form>
                    </Card.Body>
                    <Card.Footer className="text-link" onClick={() => this.register()}>ثبت نام</Card.Footer>
                </Card>
            </Col>
        )
    }
}

export default Login;
