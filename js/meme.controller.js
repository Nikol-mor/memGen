'use strict';

function onInit() {
  gElCanvas = document.querySelector('.canvas');
  gCtx = gElCanvas.getContext('2d');

  addListeners();
  renderGallery();
  renderCanvas();
  // if (!isImgClicked()) {
  //   renderGallery();
  // } else {
  //   document.querySelector('.meme-editor-container').classList.remove('none');
  //   document.querySelector('.grid-container').classList.add('none');
  // }
}

function renderGallery() {
  const imgs = getImgs();
  var strHTMLs = imgs.map((img) => {
    return `<div class="img"><img src="./img/memes/${img.id}.jpg" onClick="onClickedImg(${img.id})"></div>`;
  });
  const elGallery = document.querySelector('.grid-container');
  elGallery.innerHTML = strHTMLs.join('');
}

function onClickedImg(imgId) {
  setMemeId(imgId);
  document.querySelector('.grid-container').classList.add('none');
  document.querySelector('.about-me').classList.add('none');
  document.querySelector('.meme-editor-container').classList.remove('none');
  renderCanvas();
}

function onMeme() {
  document.querySelector('.grid-container').classList.add('none');
  document.querySelector('.meme-editor-container').classList.add('none');
  document.querySelector('.saved-memes').classList.remove('none');
  document.querySelector('.about-me').classList.add('none');

  renderMemes();
}

function onGallery() {
  document.querySelector('.grid-container').classList.remove('none');
  document.querySelector('.about-me').classList.remove('none');
  document.querySelector('.meme-editor-container').classList.add('none');
  onInit();
}

function onAbout() {
  document.querySelector('.grid-container').classList.add('none');
  document.querySelector('.about-me').classList.remove('none');
  document.querySelector('.meme-editor-container').classList.add('none');
  onInit();
}

function onToggleMenu() {
  var mainMenu = document.getElementById('mainMenu');
  console.log(mainMenu);
  mainMenu.classList.toggle('open');
}

// function onToggleMenu() {
//   document.body.classList.toggle('menu-open');
// }
