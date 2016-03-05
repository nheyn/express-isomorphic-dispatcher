import React from 'react';

const TextField = React.createClass({
  propTypes: {
    initialValue: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    onUpdate: React.PropTypes.func.isRequired
  },
  getInitialState() {
    return {
      isEditingValue: false,
      value: this.props.initialValue
    };
  },
  componentWillReceiveProps(newProps) {
    const { initialValue: newValue } = newProps;

    if(this.state.value !== newValue) this.setState({ value: newValue });
  },
  startEdit() {
    this.setState({ isEditingValue: true });
  },
  stopEdit() {
    this.props.onUpdate(this.state.value);

    this.setState({ isEditingValue: false });
  },
  onUpdate(event) {
    const { value } = event.target;
    if(value === this.state.value) return;

    this.setState({ value });
  },
  render() {
    const { placeholder } = this.props;
    const { value, isEditingValue } = this.state;

    if(isEditingValue) {
      return (
        <input
          type="text"
          autoFocus onFocus={(e) => e.target.select()}
          value={value}
          placeholder={placeholder? placeholder: ''}
          onChange={this.onUpdate}
          onBlur={this.stopEdit}
        />
      );
    }
    else {
      return (
        <span onClick={this.startEdit}>
          {value?
            value:
            (placeholder? placeholder: '')
          }
        </span>
      );
    }
  }
});
export default TextField;