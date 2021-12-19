'use strict';

function onInit() {
  gElCanvas = document.querySelector('.canvas');
  gCtx = gElCanvas.getContext('2d');

  addListeners();
  renderGallery();
  renderCanvas();
  renderSaved();
}

function renderGallery() {
  const imgs = getImgs();
  console.log('imgs in render', imgs);
  var strHTMLs = imgs.map((img) => {
    return `<div class="img"><img src="img/memes/${img.id}.jpg" onClick="onClickedImg(${img.id})"></div>`;
  });
  const elGallery = document.querySelector('.grid-container');
  elGallery.innerHTML = strHTMLs.join('');
}

function renderSaved() {
  const elSaved = document.querySelector('.saved-memes');
  const memes = getSaved();
  if (!memes.length) {
    elSaved.innerHTML = `<h2>No saved memes</h2>`;
    return;
  }
  var strHTMLs = memes.map((meme) => {
    return `<img src="${meme}" alt=""></div>`;
  });
  elSaved.innerHTML = strHTMLs.join('');
}

function onSearch(keyword) {
  console.log('onSearch', keyword);
  setFilter(keyword);
  renderGallery();
}

function onClickedImg(imgId) {
  setMemeId(imgId);
  document.querySelector('.grid-container').classList.add('none');
  document.querySelector('.about-me').classList.add('none');
  document.querySelector('.meme-editor-container').classList.remove('none');
  document.querySelector('.saved-memes').classList.add('none');
  document.querySelector('.search-keywords').classList.add('none');
  renderCanvas();
}

function onMeme() {
  document.querySelector('.grid-container').classList.add('none');
  document.querySelector('.meme-editor-container').classList.add('none');
  document.querySelector('.saved-memes').classList.remove('none');
  document.querySelector('.about-me').classList.add('none');
  document.querySelector('.search-keywords').classList.add('none');

  renderSaved();
}

function onGallery() {
  document.querySelector('.grid-container').classList.remove('none');
  document.querySelector('.about-me').classList.remove('none');
  document.querySelector('.meme-editor-container').classList.add('none');
  document.querySelector('.saved-memes').classList.add('none');
  document.querySelector('.search-keywords').classList.remove('none');
  onInit();
}

function onAbout() {
  document.querySelector('.grid-container').classList.add('none');
  document.querySelector('.about-me').classList.remove('none');
  document.querySelector('.meme-editor-container').classList.add('none');
  document.querySelector('.saved-memes').classList.add('none');
  document.querySelector('.search-keywords').classList.add('none');
  onInit();
}

function onToggleMenu() {
  document.body.classList.toggle('open-menu');
}

function onToggleKeywords() {
  const isAllKeysSeen =
    document.querySelector('.btn-more-less').innerText === 'More...'
      ? false
      : true;
  console.log('isAllKeysSeen', isAllKeysSeen);
  if (!isAllKeysSeen) {
    document.querySelector('.secondary').classList.remove('none');
    document.querySelector('.btn-more-less').innerText = 'Less...';
  } else {
    document.querySelector('.secondary').classList.add('none');
    document.querySelector('.btn-more-less').innerText = 'More...';
  }
}
