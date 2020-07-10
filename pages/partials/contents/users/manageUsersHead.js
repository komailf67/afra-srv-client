import React, {Component} from "react";
import {connect} from "react-redux";
import {dispatchActions} from "../../../../redux/actions";
import {Table} from "react-bootstrap";
import {IS_FORM_SUBMITTED, USERS} from "../../consts/actionsConstants";
import UsersItem from "./usersItem";

class ManageUsersHead extends Component {
    componentDidMount() {
        this.props.fetchData('http://automation.afra.local/api/users', USERS, '', localStorage.getItem('access_token'));
    }

    render() {
        let {users, formStatus} = this.props;
        let {isFormSubmitted, message} = formStatus;


        if (!users.hasOwnProperty('data')) {
            return <h3>Loading</h3>;
        }

        if (message) {
            alert(message)
            this.props.fetchData('', IS_FORM_SUBMITTED, false)
        }

        let userRow = [];
        users.data.map((user, index) => {
            userRow.push(<UsersItem key={index} row={index} user={user}/>)
        })
        return (
            <div id="manage-users">
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>ردیف</th>
                        <th>نام کاربر</th>
                        <th>سمت</th>
                        <th>دسترسی به سفارشات</th>
                        <th>دسترسی به لیست کالاها</th>
                        <th>دسترسی به پیش فاکتورها</th>
                        <th>دسترسی به انبار</th>
                        <th>عملیات</th>
                    </tr>
                    </thead>
                    <tbody>
                    {userRow}
                    </tbody>
                </Table>
                <div className="App">
                    {/*{saleInvoiceModalComponent}*/}
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url, actionType, data, token) => dispatch(dispatchActions(url, actionType, data, token)),
    }
}
const mapStateToProps = (state) => {
    return {
        users: state.users.users,
        formStatus: state.formReducer
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageUsersHead);
