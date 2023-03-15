const convertBtn = document.getElementById("convert-btn");
const inputText = document.getElementById("input-text");
const outputContainer = document.getElementById("output-container");

convertBtn.addEventListener("click", () => {
  const text = inputText.value;
  const img = generateHandwriting(text);
  outputContainer.innerHTML = "";
  outputContainer.appendChild(img);
});

function generateHandwriting(text) {
  const font = new FontFace("CustomFont", "url(path/to/font.woff)");
  font.load().then(() => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    context.font = "32px CustomFont";
    const textWidth = context.measureText(text).width;
    const textHeight = 40;
    canvas.width = textWidth + 50;
    canvas.height = textHeight + 50;
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "black";
    context.fillText(text, 25, 35);
    const img = new Image();
    img.src = canvas.toDataURL();
    return img;
  });
}
