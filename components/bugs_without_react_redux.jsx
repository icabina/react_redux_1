import React from "react";
import StoreContext from "../contexts/storeContext";
import { loadBugs } from "../store/slices/bugsSlice";

class Bugs extends React.Component {
  //static property of class if can be accessed from the class, ex: Bugs.contextType
  static contextType = StoreContext;

  state = { bugs: [] };

  //*************************
  componentDidMount() {
    //SUBSCRIBE

    console.log(this.context);
    const store = this.context;

    this.unsubscribe = store.subscribe(() => {
      //GET THE STATE BUGS FROM REDUX
      //check before setting state, otherwise the state will reset everytime dispatch orher actions
      //const bugsInStore = store.getState().entities.bugs.list;

      if (this.state.bugs !== store.getState().entities.bugs.list)
        this.setState({
          //bugs: bugsInStore,
          bugs: store.getState().entities.bugs.list,
        });
    }); //we give it a function, this funciton gets executed everytime dispatch

    //DISPATCH (loadBugs)
    store.dispatch(loadBugs());
  }
  //*************************
  componentWillUnmount() {
    this.unsubscribe();
  }
  //*************************
  render() {
    return (
      <ul>
        {this.state.bugs.map((b) => (
          <li key={b.id}>{b.description}</li>
        ))}
      </ul>
    );
  }
}

export default Bugs;
