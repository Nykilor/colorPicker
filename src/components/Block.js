import React, {Component} from 'react';


class Block extends Component {
  constructor() {
    super();
  }

  render() {
    return(
      <div className="color-block" style={{backgroundColor: this.props.backgroundColor}}></div>
    );
  }

}

export default Block;
