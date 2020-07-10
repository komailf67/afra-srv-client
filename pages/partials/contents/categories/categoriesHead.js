import React, {Component} from 'react';
import {Table, Button} from "react-bootstrap";
import {connect} from "react-redux";
import {dispatchActions} from "../../../../redux/actions";
import {
    CATEGORIES,
    IS_FORM_SUBMITTED
} from "../../consts/actionsConstants";
import AddHead from "./addHead";
import $ from "jquery";
import CategoriesListItem from "./categoriesListItem";

class categoriesHead extends Component {

    componentDidMount = () => {
        this.props.fetchData('http://automation.afra.local/api/categories', CATEGORIES)
    }

    render() {
        let {categories, newCategory, messageShowed, formStatus} = this.props;
        let {isFormSubmitted, message} = formStatus;
        let categoriesRow = [];
        if (categories) {
            categoriesRow = categories.map((value, index) => {
                return [<CategoriesListItem key={index} row={index} category={value}/>];
            });
        }

        if (message) {
            alert(message)
            this.props.fetchData('', IS_FORM_SUBMITTED, false)
        }

        if (newCategory) {
            if (isFormSubmitted) {
                alert(message)
                $('form').find("input").val("");
                $('#category').prop('selectedIndex', 0);
                this.props.fetchData('', IS_FORM_SUBMITTED, false)
            }
        }

        return (
            <div id="categories-list">
                <AddHead />
                <Table className="mt-3" striped bordered hover>
                    <thead>
                    <tr>
                        <th>ردیف</th>
                        <th>عنوان دسته بندی</th>
                    </tr>
                    </thead>
                    <tbody>
                    {categoriesRow}
                    </tbody>
                </Table>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url, actionType, data) => dispatch(dispatchActions(url, actionType, data)),
    }
}
const mapStateToProps = (state) => {
    return {
        categories: state.categories.categories.data,
        newCategory: state.categories.newCategory,
        formStatus: state.formReducer
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(categoriesHead);