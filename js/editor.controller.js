'use strict';

var gElCanvas;
var gCtx;
var gStartPos;

function renderCanvas() {
  const img = new Image();
  console.log('img', img);
  img.src = getImg();
  console.log('img.src', img.src);
  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
    drawText();
    renderInput();
  };
}

function addListeners() {
  addMouseListeners(); // later add touch listeners
}

function addMouseListeners() {
  gElCanvas.addEventListener('mousemove', onMove);
  gElCanvas.addEventListener('mousedown', onDown);
  gElCanvas.addEventListener('mouseup', onUp);
}

function onMove(ev) {
  const line = getLine();
  if (!line || !line.isDrag) return;
  const pos = getEvPos(ev);
  const dx = pos.x - gStartPos.x;
  const dy = pos.y - gStartPos.y;
  gElCanvas.style.cursor = 'grab';
  moveLine(dx, 'x');
  moveLine(dy, 'y');
  gStartPos = pos;
  renderCanvas();
}

function onDown(ev) {
  const pos = getEvPos(ev);
  if (!isLineClicked(pos)) return;
  setLineDrag(true);
  gStartPos = pos;
  renderInput();
  renderCanvas();
}

function onUp(ev) {
  setLineDrag(false);
  gElCanvas.style.cursor = 'grab';
}

function drawText() {
  const lines = getLines();
  lines.forEach((line) => {
    const txt = line.txt;
    gCtx.lineWidth = 2;
    gCtx.textBaseline = 'top';
    gCtx.textAlign = `${line.align}`;
    gCtx.font = `${line.size}px ${line.font}`;
    gCtx.fillStyle = line.color;
    gCtx.strokeStyle = line.stroke;
    gCtx.fillText(txt, line.pos.x, line.pos.y);
    gCtx.strokeText(txt, line.pos.x, line.pos.y);
  });
}

function onChangeText(txt) {
  changeText(txt);
  renderCanvas();
}

function onAddText() {
  const newLine = renderInput();
  addText(newLine);
  renderCanvas();
}

function onFocusLine() {
  changeFocusLine();
  renderInput();
  renderCanvas();
}

function renderInput() {
  const line = getLine();
  if (!line) {
    document.querySelector('[name="text"]').value = 'Enter your sentence here';
    return;
  }
  document.querySelector('[name="text"]').value = line.txt;

  const meme = getMeme();
}

function onChangeColor(type, color) {
  changeColor(type, color);
  renderCanvas();
}

function onSizeText(type) {
  sizeText(type);
  renderCanvas();
}

function onEraseText() {
  eraseText();
  renderCanvas();
}

function onAlignText(dir) {
  align(dir);
  renderCanvas();
}

function onChangeFont(font) {
  changeFont();
  renderCanvas();
}

function onDownload(elLink) {
  const imgContent = gElCanvas.toDataURL();
  elLink.href = imgContent;
  elLink.download = 'my-canvas.jpg';
}

function onSave() {
  console.log('onSave');
  const imgContent = gElCanvas.toDataURL();
  console.log('imgContent', imgContent);
  save(imgContent);
}

function onShare() {
  const imgDataUrl = gElCanvas.toDataURL('image/jpeg');
  console.log(imgDataUrl);

  function onSuccess(uploadedImgUrl) {
    const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl);
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}`
    );
  }
  doUploadImg(imgDataUrl, onSuccess);
}

function doUploadImg(imgDataUrl, onSuccess) {
  const formData = new FormData();
  formData.append('img', imgDataUrl);

  fetch('//ca-upload.com/here/upload.php', {
    method: 'POST',
    body: formData,
  })
    .then((res) => res.text())
    .then((url) => {
      console.log('Got back live url:', url);
      onSuccess(url);
    })
    .catch((err) => {
      console.error(err);
    });
}
