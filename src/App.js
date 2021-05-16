import React, { Component } from 'react';
import View from "./View/View";
import {connect} from "react-redux";


class App extends Component {
  render() {
    return (
      <div className="App">
      <View />
      </div>
    );
  }
}

export default connect(null,null)(App);
