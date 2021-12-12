import React from "react";
import {
  loadBugs,
  resolveBug,
  getUnresolvedBugs,
} from "../store/slices/bugsSlice";
import { connect } from "react-redux";

class BugsListClass extends React.Component {
  //*************************
  componentDidMount() {
    this.props.loadBugs();
  }
  //*************************
  render() {
    return (
      <ul>
        {this.props.bugs.map((b) => (
          <li key={b.id}>
            {b.description}
            <button onClick={() => this.props.resolveBug(b.id)}>Resolve</button>
          </li>
        ))}
      </ul>
    );
  }
}
//********************************************************
//********************************************************
//********************************************************
//********************************************************
//REACT-REDUX

//in this component we are interested in state.entities.bugs.list
const mapStateToProps = (state) => ({
  //is a function that takes the store and return the part of the store we are interested in
  //bugs: state.entities.bugs.list,

  //USE SELECTOR INSTEAD
  bugs: getUnresolvedBugs(state),
});

//This function takes the dispatch function of the store and map it to the props to component
const mapDispatchToProps = (dispatch) => ({
  loadBugs: () => dispatch(loadBugs()), //prop in commponent
  resolveBug: (id) => dispatch(resolveBug(id)), //dispatch actionCreator from bugsSlice
});
//Higher Order Function, (knd higher order component)
//when we call this function we get a new function
//so we call this new function and pass our component
export default connect(mapStateToProps, mapDispatchToProps)(BugsListClass);
