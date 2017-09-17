import React, {Component} from 'react';


class Paragraphs extends Component {
  constructor() {
    super();
  }

  render() {
    const text = this.props.textValues;
    return(
      <div className="paragraphs">
        <p onClick={this.props.onClick} className={(text.rgb.isVisible)? "" : "d-none"}>{text.rgb.value}</p>
        <p onClick={this.props.onClick} className={(text.hex.isVisible)? "" : "d-none"}>{text.hex.value}</p>
        <p onClick={this.props.onClick} className={(text.hsl.isVisible)? "" : "d-none"}>{text.hsl.value}</p>
      </div>
    );
  }

}

export default Paragraphs;
