import React from 'react';
import Store from '../../store/AppStore';
import MenuActions from "../../actions/MenuActions";

const List = (props) => {
  return (
    <Table striped bordered condensed hover>
      <thead>
      <tr>
        <th>#</th>
        <th>Username</th>
        <th>Mobile</th>
      </tr>
      </thead>
      <tbody>
      {this.props.list.map((item, index) => {
        return (
          <tr>
            <td>{index}</td>
            <td>{item.cn}</td>
            <td>{item.mobile}</td>
          </tr>
        )
      })}
      </tbody>
    </Table>
  )
};


class ListGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = Store.getState();
    this._onChange = this._onChange.bind(this);
  }

  componentWillMount() {
    MenuActions.getUserList();
  }

  componentDidMount() {
    Store.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    Store.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState(Store.getState());
  }

  render() {
    return (
      <div>
        <List list = {this.state.userList} />
      </div>
    );
  }
}


export default ListGrid;