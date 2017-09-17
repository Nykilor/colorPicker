import React, {Component} from 'react';
import './App.css';
import BIP from "./containers/BIP.js"

class App extends Component {
  constructor(props) {
    super();
  }

  render() {
    return(
        <BIP />
    );
  }
}


export default App;
