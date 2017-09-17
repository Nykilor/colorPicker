String.prototype.pad = function(number, padChar) {
  var toAddCount = Math.max(0, number - this.length + 1);

  padChar = padChar || '0';

  return new Array(toAddCount).join(padChar) + this;
};

/**
 * Removes all spaces from the string
 * @return String - string with no spaces
 */
String.prototype.removeAllSpaces = function() {
  return this.split(' ').join('');
}

class Color {

  constructor(colorString) {
    this.red = 255;
    this.blue = 255;
    this.green = 255;
    this.type = "hex";
    if (colorString.length > 3) {
      this.createRGB(colorString);
    }
  }

  createRGB(colorString) {
    colorString = colorString.replace(/\s/g, '').toLowerCase();
    var REGEX = {
        HEX: /^\#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})$/,
        SHORT_HEX: /^\#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])$/,
        RGB: /^rgb\((\d{1,3})\,(\d{1,3})\,(\d{1,3})\)$/,
        HSL: /^hsl\((\d{1,3})\,(\d{1,3})\%\,(\d{1,3})\%\)$/
      },
      colors,
      hslValues,
      base;

    function isColorValid(number) {
      return number >= 0 && number <= 255;
    }

    if (colors = colorString.match(REGEX.HEX)) {
      console.log(true);
      //HEX
      base = 16;
      colors.splice(0, 1);
    } else if (colors = colorString.match(REGEX.SHORT_HEX)) {
      //SHORT HEX
      base = 16;
      colors = colors.slice(1).map(function(color) {
        return color + color;
      });
    } else if (colors = colorString.match(REGEX.RGB)) {
      //RGB
      this.type = "rgb";
      base = 10;
      colors.splice(0, 1);
    } else if (hslValues = colorString.match(REGEX.HSL)) {
      this.type = "hsl";
      //HSL
      base = 10;
      colors = this.hslToRgb(hslValues.slice(1).map(function(value) {
        return parseInt(value, 10);
      }));
    } else {
      return;
    }

    this.red = parseInt(colors[0], base);
    this.green = parseInt(colors[1], base);
    this.blue = parseInt(colors[2], base);

    if (![this.red, this.green, this.blue].every(isColorValid)) {
      return;
    }
  }

  hslToRgb(array) {
    var r,
      g,
      b,
      h = array[0] / 360,
      s = array[1] / 100,
      l = array[2] / 100;

    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      var hue2rgb = function hue2rgb(p, q, t) {
        if (t < 0)
          t += 1;
        if (t > 1)
          t -= 1;
        if (t < 1 / 6)
          return p + (q - p) * 6 * t;
        if (t < 1 / 2)
          return q;
        if (t < 2 / 3)
          return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      }

      var q = l < 0.5
        ? l * (1 + s)
        : l + s - l * s;
      var p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    return [
      Math.round(r * 255),
      Math.round(g * 255),
      Math.round(b * 255)
    ];
  }

  get hex() {
    return '#' + this.red.toString(16).pad(2) + this.green.toString(16).pad(2) + this.blue.toString(16).pad(2);
  }

  get rgb() {
    return 'rgb(' + this.red + ', ' + this.green + ', ' + this.blue + ')';
  }

  get hsl() {
    let hsl = this.rgbToHsl(this.red, this.green, this.blue);
    console.log(hsl);
    return 'hsl(' + hsl[0] + ', ' + hsl[1] + '%, ' + hsl[2] + '%)';
  }

  rgbToHsl(r, g, b) {
    r /= 255,
    g /= 255,
    b /= 255;
    var max = Math.max(r, g, b),
      min = Math.min(r, g, b);
    var h,
      s,
      l = (max + min) / 2;

    if (max == min) {
      h = s = 0; // achromatic
    } else {
      var d = max - min;
      s = l > 0.5
        ? d / (2 - max - min)
        : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b
            ? 6
            : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }

    return [
      Math.floor(h * 360),
      Math.floor(s * 100),
      Math.floor(l * 100)
    ];
  }

}

export default Color;
