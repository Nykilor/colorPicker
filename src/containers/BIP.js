import React, {Component} from 'react';
import Color from "../Color.js";
import Block from "../components/Block.js";
import Input from "../components/Input.js";
import Paragraphs from "../components/Paragraphs.js";

var that;
class BIP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: "#fff",
      text: {
        "rgb": {
          "value": "RGB(255, 255, 255)",
          "isVisible": false,
        },
        "hex": {
          "value": "#FFFFFF",
          "isVisible": false,
        },
        "hsl": {
          "value": "HSL(0, 0%, 100%)",
          "isVisible": false,
        }
      }
    };
    that = this;
  }

  inputOnChange(e) {
    let color = new Color(e.target.value);
    console.log(color.type);
    that.setState({
      color: color.rgb,
      text: {
        "rgb": {
          "value": color.rgb,
          "isVisible": (color.type === "rgb")? false : true,
        },
        "hex": {
          "value": color.hex,
          "isVisible": (color.type === "hex")? false : true,
        },
        "hsl": {
          "value": color.hsl,
          "isVisible": (color.type === "hsl")? false : true,
        },
      }
    });
  }

  paragraphClick(e) {
    let text = e.target.innerText;
    let textField = document.createElement('textarea');
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();
  }

  render() {
    return(
      <div>
        <Block backgroundColor={this.state.color}/>
        <div className="values">
          <Input onChange={this.inputOnChange} />
          <p>Click on the values to copy them.</p>
          <Paragraphs textValues={this.state.text} onClick={this.paragraphClick}/>
        </div>
      </div>
    );
  }

}

export default BIP;
