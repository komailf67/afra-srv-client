import React , {Component} from "react";
import {Form, Col, Button, Card} from "react-bootstrap";
import axios from 'axios';

import $ from "jquery";

export default class Register extends Component{
    registerNewUser = () =>{
        axios.post('http://automation.afra.local/api/register',{
            name : $('#name').val(),
            family : $('#family').val(),
            email : $('#email').val(),
            password : $('#password').val(),
            password_confirmation: $('#password_confirmation').val(),
            role: $('#roles').val()
        }).then(response =>{
            let{token , role} = response.data.data;
            localStorage.setItem('access_token', token);
            localStorage.setItem('role', role);
            window.location.replace("/");
        }).catch(error=>{
        })
    }

    login = () => {
        window.location.replace("/");
    }

    render(){
        return (
            <Col className="text-right">
                <Card className="loginCenter">
                    <Card.Header>ثبت نام</Card.Header>
                    <Card.Body>
                        <Form>
                            <Form.Group as={Col} controlId="name">
                                <Form.Label>نام</Form.Label>
                                <Form.Control type="text" placeholder="Enter name"/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="family">
                                <Form.Label>نام خانوادگی</Form.Label>
                                <Form.Control type="text" placeholder="Enter family"/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="email">
                                <Form.Label>ایمیل</Form.Label>
                                <Form.Control type="email" placeholder="Enter email"/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="password">
                                <Form.Label>پسورد</Form.Label>
                                <Form.Control type="password" placeholder="Password"/>
                            </Form.Group>
                            <Form.Group as={Col} controlId="password_confirmation">
                                <Form.Label>تایید پسورد</Form.Label>
                                <Form.Control type="password" placeholder="Confirm Password"/>
                            </Form.Group>

                            <Button variant="primary" type="button" onClick={() => {
                                this.registerNewUser()
                            }}>
                                Submit
                            </Button>
                        </Form>
                    </Card.Body>
                    <Card.Footer className="text-link" onClick={() => this.login()}>ورود</Card.Footer>
                </Card>
            </Col>
        )
    }
}