import React from 'react';
import Immutable from 'immutable';

import TodoListHeader from './TodoListHeader';
import TodoListBody from './TodoListBody';

/**
 * React Component that render the entire app.
 */
const App = React.createClass({
  propTypes: {
    dispatcher: React.PropTypes.object.isRequired   // Isomorphic Dispatcher
  },
  renderHeader() {
    const ConnectedTodoListHeader = connectBasicInfo(TodoListHeader, this.props.dispatcher);

    return <ConnectedTodoListHeader />;
  },
  renderBody() {
    const ConnectedTodoListBody = connectTodoList(TodoListBody, this.props.dispatcher);

    return <ConnectedTodoListBody />;
  },
  render() {
    const { title } = this.props.dispatcher.getStateFor('pageTitle');

    return (
      <div>
        <h3>{title}</h3>
        <div>
          {this.renderHeader()}
          {this.renderBody()}
        </div>
      </div>
    );
  }
});
export default App;


function connectBasicInfo(Component, dispatcher) {
  return connectStore(Component, dispatcher, 'basicInfo');
}

function connectTodoList(Component, dispatcher) {
  return connectStore(Component, dispatcher, 'todoList');
}

function connectStore(Component, dispatcher, storeName) {
  const UseStore = React.createClass({
    getInitialState() {
      return {
        storeState: dispatcher.getStateFor(storeName),
      };
    },
    componentDidMount() {
      const unsubscribe = dispatcher.subscribeTo(storeName, (updatedState) => {
        //DEMO LOGGING
        console.log(`${storeName} state updated to`, Immutable.fromJS(updatedState).toJS());
        //DEMO LOGGING

        this.setState({ storeState: updatedState });
      });

      this.setState({ unsubscribe });
    },
    componentWillUnmount() {
      if(!this.state.unsubscribe) return;

      this.state.unsubscribe();
      this.setState({ unsubscribe: null });
    },
    dispatch(action) {
      //DEMO LOGGING
      console.log(`${storeName} Component has dispatched`, action);
      //DEMO LOGGING

      return dispatcher.dispatch(action);
    },
    render() {
      return <Component {...this.props} {...this.state.storeState} dispatch={this.dispatch} />;
    }
  });
  return UseStore;
}