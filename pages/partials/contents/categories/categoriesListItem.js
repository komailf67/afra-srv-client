import React, {Component} from 'react';

class CategoriesListItem extends Component {

    render() {
        let {row, category} = this.props;
        return (
            <tr>
                <td>{row+1}</td>
                <td>{category.title}</td>
            </tr>
        )
    }
}

export default CategoriesListItem;
