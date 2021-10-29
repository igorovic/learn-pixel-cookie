//@ts-check

/** @type HTMLCanvasElement */
let canvas;
const ALPHA = 255;
function createCanva() {
  console.debug("create canvas");
  canvas = document.createElement("canvas");
  canvas.width = 600;
  canvas.height = 600;
  canvas.style.zIndex = "8";
  canvas.style.position = "absolute";
  canvas.style.border = "1px solid";

  const body = document.getElementsByTagName("body")[0];
  body.appendChild(canvas);
  return canvas;
}

function str2ab(str) {
  var buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
  var bufView = new Uint16Array(buf);
  for (var i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

/** @param {string} msg */
function save(msg) {
  const padding_msg = msg.length % 4;
  let _msg = msg;
  for (let i = 0; i < padding_msg; i++) {
    _msg = msg + ".";
  }

  var buf = str2ab(_msg);
  console.debug(buf);
  const DV = new DataView(buf, 0);

  const _imageData = [];
  for (let i = 0; i < DV.byteLength; i++) {
    if (i > 0 && i % 3 === 0) {
      // should be alpha channel
      _imageData.push(ALPHA);
    }
    _imageData.push(DV.getUint8(i));
  }
  _imageData.push(ALPHA);

  //   const padding = _imageData.length % 4;
  //   for (let i = 0; i <= padding; i++) {
  //     _imageData.push(0);
  //   }

  const ca = new Uint8ClampedArray(_imageData);
  console.debug(ca);
  const width = ca.length / 4;
  const height = ca.length / 16;
  const pixel = new ImageData(ca, ca.length / 4);
  console.debug(pixel);
  canvas.width = width;
  canvas.height = height;
  console.debug();
  const ctx = canvas.getContext("2d");
  ctx.putImageData(pixel, 0, 0);
  //var myImageData = ctx.createImageData(1, 1);
  //ctx.drawImage(image, 0, 0);
}

document.addEventListener("DOMContentLoaded", (event) => {
  createCanva();
  save("⛳");
});
