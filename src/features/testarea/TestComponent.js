import React, { Component } from "react";
import { connect } from "react-redux";
import { incrementCounter, decrementCounter } from "./testActions";
import { Button } from "semantic-ui-react";

const mapState = (state) => ({
  data: state.test.data, // test refers to the testReducer
});
const actions = {
  incrementCounter,
  decrementCounter,
};

class TestComponent extends Component {
  render() {
    const { data, incrementCounter, decrementCounter } = this.props;
    return (
      <div>
        <h1>TestComponent</h1>
        <h3>Anwser is: {data}</h3>
        <Button
          onClick={incrementCounter}
          positive
          content='Increment'
        ></Button>
        <Button
          onClick={decrementCounter}
          negative
          content='Decrement'
        ></Button>
      </div>
    );
  }
}

export default connect(mapState, actions)(TestComponent);
