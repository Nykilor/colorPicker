import React, {Component} from 'react';

class Input extends Component {
  constructor(state) {
    super(state);
  }

  render() {
    return (<input autoComplete="false" type="text" name="color" id="color" placeholder="Pick a color" onChange={this.props.onChange}/>);
  }

}

export default Input;
