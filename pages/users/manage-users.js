import React , { Component } from "react";
import { Card , Container , Row , Col } from "react-bootstrap";
import Content from "../partials/Content";
import Head from "../partials/contents/users/manageUsersHead";
import RightMenu from "../partials/menus/RightMenu";

class ManageUsers extends Component {

    render(){
        return(
            <React.Fragment>
                <Container>
                    <Row>
                        <RightMenu />
                        <Content title="مدیریت کاربران">
                            <Head />
                        </Content>
                    </Row>
                </Container>
            </React.Fragment>
        )
    }
}
export default ManageUsers;