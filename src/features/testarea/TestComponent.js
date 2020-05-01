import React, { Component } from "react";
import { connect } from "react-redux";
import { incrementAsync, decrementAsync } from "./testActions";
import { Button } from "semantic-ui-react";
import PlacesAutocomplete from "./TestPlaceInput";
import SimpleMap from "./SimpleMap";
import {openModal} from "../modals/modalActions";

const mapState = (state) => ({
  data: state.test.data, // test refers to the testReducer
  loading: state.async.loading,
  buttonName: state.async.elementName,
  type: state.async.type
});
const actions = {
  incrementAsync,
  decrementAsync,
  openModal,
};

class TestComponent extends Component {
  componentDidMount() {
    console.log("[TestComponent.js]: componentDidMount")
  }
  componentDidUpdate(){
    console.log("[TestComponent.js]: componentDidUpdate")
  }

  render() {
    const { data, incrementAsync, decrementAsync, openModal, loading, buttonName, type } = this.props;
    console.log("Redux Action:", type);
    return (
      <div>
        <h1>TestComponent</h1>
        <h3>Anwser is: {data}</h3>
        <Button
          name ='increment'
          loading={buttonName=== "increment" && loading}
          onClick={(e) => incrementAsync(e.target.name)}
          positive
          content='Increment'
        ></Button>
        <Button
          name='decrement'
          loading={buttonName=== "decrement" && loading}
          onClick={(e) => decrementAsync(e.target.name)}
          negative
          content='Decrement'
        ></Button>
        <Button
          onClick={()=>openModal('TestModal', {data: 42})}
          color ='teal'
          content='Open Modal'
        ></Button>
        <br>
        </br>
        <br></br>
        <PlacesAutocomplete></PlacesAutocomplete>
        <SimpleMap></SimpleMap>
      </div>
    );
  }
}

export default connect(mapState, actions)(TestComponent);
