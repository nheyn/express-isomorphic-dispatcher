import React from 'react';

import TextField from './TextField';

import {
  TODO_LIST_CHECK_ITEM,
  TODO_LIST_UNCHECK_ITEM,
  TODO_LIST_UPDATE_DESCRIPTION,
  TODO_LIST_ADD_ITEM,
  TODO_LIST_LOAD_ITEMS
} from '../stores/todoList';

const TodoListBody = React.createClass({
  propTypes: {
    items: React.PropTypes.object.isRequired,   // Immutable.List
    dispatch: React.PropTypes.func.isRequired
  },
  check(index) {
    this.props.dispatch({
      type: TODO_LIST_CHECK_ITEM,
      index
    });
  },
  uncheck(index) {
    this.props.dispatch({
      type: TODO_LIST_UNCHECK_ITEM,
      index
    });
  },
  updateDescription(index, description) {
    this.props.dispatch({
      type: TODO_LIST_UPDATE_DESCRIPTION,
      index,
      description
    });
  },
  addNewItem(description) {
    this.props.dispatch({
      type: TODO_LIST_ADD_ITEM,
      description
    });
  },
  componentDidMount() {
    this.props.dispatch({
      type: TODO_LIST_LOAD_ITEMS
    });
  },
  render() {
    const { items } = this.props;

    const makeOnCheck = (index, isChecked) => {
      if(isChecked) return () => this.uncheck(index);
      else      return () => this.check(index);
    };
    const makeOnDescriptionUpdate = (index) => {
      return (updatedDescription) => this.updateDescription(index, updatedDescription);
    };

    return (
      <div>
      {items.map((item, index) =>
        <div key={index}>
          <TodoListBodyItem
            isChecked={item.get('isChecked')}
            description={item.get('description')}
            placeholder="Item Description..."
            onCheck={makeOnCheck(index, item.get('isChecked'))}
            onDescriptionUpdate={makeOnDescriptionUpdate(index)}
          />
        </div>
      ).toArray()}
        <div>
          <TodoListBodyItem
            isCheckboxDisabled={true}
            placeholder="New Item..."
            onDescriptionUpdate={this.addNewItem}
          />
        </div>
      </div>
    );
  }
});
export default TodoListBody;

const TodoListBodyItem = React.createClass({
  propTypes: {
    isChecked: React.PropTypes.bool,
    isCheckboxDisabled: React.PropTypes.bool,
    description: React.PropTypes.string,
    placeholder: React.PropTypes.string.isRequired,
    onCheck: React.PropTypes.func,
    onDescriptionUpdate: React.PropTypes.func.isRequired
  },
  getDefaultProps() {
    return {
      isChecked: false,
      isCheckboxDisabled: false
    };
  },
  render() {
    //TODO, always double clicks checkbox
    const { isChecked, isCheckboxDisabled, description, placeholder, onCheck, onDescriptionUpdate } = this.props;

    return (
      <div>
        <input type="checkbox" checked={isChecked} disabled={isCheckboxDisabled} onChange={onCheck} />
        <TextField initialValue={description} onUpdate={onDescriptionUpdate} placeholder={placeholder} />
      </div>
    );
  }
});