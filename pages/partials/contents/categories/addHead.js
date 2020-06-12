import React, {Component} from 'react';
import {Form, Button, Col, FormControl, InputGroup} from 'react-bootstrap';
import {connect} from "react-redux";
import {dispatchActions} from "../../../../redux/actions";
import {ADD_CATEGORY, ADD_TO_PRODUCTS_LIST, MESSAGE_SHOWED} from "../../consts/actionsConstants";
import $ from "jquery";
import dynamic from "next/dynamic";


class AddHead extends Component {

    submitForm = () => {
        let newCategory = {};
        newCategory['title'] = $('#category').val();

        //check all fields filled
        let formFilled = true;
        $.each(newCategory, function (key, value) {
            if (!value || value == 0) {
                alert('پر کردن همه فیلدها الزامی است');
                formFilled = false;
                return false;
            }
        });
        if (formFilled) {
            this.props.fetchData('http://automation.afra.local/api/categories', ADD_CATEGORY, newCategory, localStorage.getItem('access_token'));
        }
        // this.props.fetchData('', MESSAGE_SHOWED, 1);
    }

    render() {
        return (
            <Form>
                <Form.Row className="uncommon-inputs">
                    <Form.Group as={Col}>
                        <Form.Label>عنوان دسته بندی</Form.Label>
                        <Form.Control type="text" id="category"/>
                    </Form.Group>
                </Form.Row>
                <Button variant="primary" type="button" onClick={this.submitForm}>
                    Add New
                </Button>
            </Form>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url, actionType, data, token) => dispatch(dispatchActions(url, actionType, data, token)),
    }
}

export default connect(null, mapDispatchToProps)(AddHead);
