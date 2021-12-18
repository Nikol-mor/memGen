'use strict';

const KEY = 'memesDB';

var gKeywordSearchCountMap = {
  funny: 12,
  awkward: 2,
  famous: 5,
  cute: 3,
  animal: 3,
  dog: 2,
  baby: 4,
  sleep: 2,
  knowledge: 5,
  shock: 3,
  amusing: 2,
  unimpressed: 1,
  animation: 1,
};

const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];

var gImgs = [
  {
    id: 1,
    url: 'img/memes/1.jpg',
    keywords: ['funny', 'awkward', 'famous'],
  },
  {
    id: 2,
    url: 'img/memes/2.jpg',
    keywords: ['cute', 'animal', 'dog'],
  },
  {
    id: 3,
    url: 'img/memes/3.jpg',
    keywords: ['cute', 'animal', 'baby', 'sleep', 'dog'],
  },
  {
    id: 4,
    url: 'img/memes/4.jpg',
    keywords: ['funny', 'cute', 'animal', 'sleep', 'cat'],
  },
  {
    id: 5,
    url: 'img/memes/5.jpg',
    keywords: ['funny', 'baby'],
  },
  {
    id: 6,
    url: 'img/memes/6.jpg',
    keywords: ['funny', 'knowledge'],
  },
  {
    id: 7,
    url: 'img/memes/7.jpg',
    keywords: ['funny', 'baby'],
  },
  {
    id: 8,
    url: 'img/memes/8.jpg',
    keywords: ['funny', 'happy', 'knowledge'],
  },
  {
    id: 9,
    url: 'img/memes/9.jpg',
    keywords: ['funny', 'baby'],
  },
  {
    id: 10,
    url: 'img/memes/10.jpg',
    keywords: ['funny', 'famous'],
  },
  {
    id: 11,
    url: 'img/memes/11.jpg',
    keywords: ['funny', 'awkward'],
  },
  {
    id: 12,
    url: 'img/memes/12.jpg',
    keywords: ['shock', 'famous'],
  },
  {
    id: 13,
    url: 'img/memes/13.jpg',
    keywords: ['happy', 'amusing', 'famous'],
  },
  {
    id: 14,
    url: 'img/memes/14.jpg',
    keywords: ['shock'],
  },
  {
    id: 15,
    url: 'img/memes/15.jpg',
    keywords: ['funny', 'knowledge'],
  },
  {
    id: 16,
    url: 'img/memes/16.jpg',
    keywords: ['funny', 'shock', 'amusing'],
  },
  {
    id: 17,
    url: 'img/memes/17.jpg',
    keywords: ['unimpressed', 'famous', 'knowledge'],
  },
  {
    id: 18,
    url: 'img/memes/18.jpg',
    keywords: ['funny', 'animation', 'knowledge'],
  },
];

var gIsClicked = false;
var gFocusedText;
var gSaved;
var gFilterBy;

var gMeme = {
  selectedImgId: 0,
  selectedLineIdx: 0,
  lines: [
    {
      txt: 'change your text',
      size: 30,
      align: 'left',
      color: 'white',
      stroke: 'black',
      font: 'mont',
      pos: { x: 100, y: 40 },
      isDrag: false,
    },
  ],
};

function getImgs() {
  // const imgs = gImgs.filter((img) => img.keywords.includes(gFilterBy));
  var arr = [];
  for (let i = 0; i < gImgs.length; i++) {
    const keyInImgs = gImgs[i].keywords;
    if (keyInImgs.includes(gFilterBy)) {
      arr.push(gImgs[i]);
    }
  }
  console.log('arr', arr);
  if (!arr.length) return gImgs;
  else return arr;
}

function getImg() {
  const imgId = gMeme.selectedImgId;
  const img = gImgs.find((img) => {
    return img.id === imgId;
  });
  return img.url;
}

function getMeme() {
  return gMeme;
}

function getLines() {
  return gMeme.lines;
}

function getLine() {
  return gMeme.lines[gMeme.selectedLineIdx];
}

function isImgClicked() {
  return gIsClicked;
}

function setMemeId(imgId) {
  gMeme.selectedImgId = imgId;
  gIsClicked = true;
}

function changeText(txt) {
  gMeme.lines[gMeme.selectedLineIdx].txt = txt;
}

function changeFocusLine() {
  const lines = getLines();
  if (!lines.length) return;
  if (gMeme.selectedLineIdx + 1 === lines.length) gMeme.selectedLineIdx = 0;
  else gMeme.selectedLineIdx++;
}

function addText() {
  if (gMeme.lines.length <= 1) {
    // added up to 2 sentences
    gMeme.lines.push({
      txt: 'change your text',
      size: 30,
      align: 'left',
      color: 'white',
      stroke: 'black',
      font: 'mont',
      pos: { x: 100, y: 380 },
      isDrag: false,
    });
  } else {
    // added more than two
    gMeme.lines.push({
      txt: 'change your text',
      size: 30,
      align: 'left',
      color: 'white',
      stroke: 'black',
      font: 'mont',
      pos: { x: 100, y: 210 },
      isDrag: false,
    });
  }

  gMeme.selectedLineIdx = gMeme.lines.length - 1;
}

function changeColor(type, value) {
  if (type === 'text') gMeme.lines[gMeme.selectedLineIdx].color = value;
  else gMeme.lines[gMeme.selectedLineIdx].stroke = value;
}

function sizeText(type) {
  const line = getLine();
  if (type === '+') line.size++;
  else line.size--;
}

function align(dir) {
  switch (dir) {
    case 'left':
      getLine().pos.x = 0;
      break;
    case 'right':
      getLine().pos.x = 400;
      break;
    case 'center':
      getLine().pos.x = gElCanvas.width / 2;
      break;
  }
}

function isLineClicked(pos) {
  const lines = getLines();
  const clickedLineIdx = lines.findIndex((line) => {
    const lineWidth = gCtx.measureText(line.txt).width;
    const lineHeight = line.size;
    return (
      pos.x >= line.pos.x - 10 &&
      pos.x <= line.pos.x + lineWidth + 10 &&
      pos.y >= line.pos.y - 10 &&
      pos.y <= line.pos.y + lineHeight + 10
    );
  });
  if (clickedLineIdx !== -1) {
    gMeme.selectedLineIdx = clickedLineIdx;
    return lines[clickedLineIdx];
  }
}

function getEvPos(ev) {
  var pos = {
    x: ev.offsetX,
    y: ev.offsetY,
  };
  if (gTouchEvs.includes(ev.type)) {
    ev.preventDefault();
    ev = ev.changedTouches[0];
    pos = {
      x: ev.pageX - ev.target.offsetLeft,
      y: ev.pageY - ev.target.offsetTop,
    };
  }
  return pos;
}

function setLineDrag(isDrag) {
  getLine().isDrag = isDrag;
}

function moveLine(diff, dir) {
  const line = getLine();
  line.pos[dir] += diff;
}

function eraseText() {
  const lines = getLines();
  if (!lines) return;
  lines.splice(gMeme.lines[gMeme.selectedLineIdx], 1);
  gMeme.selectedLineIdx = 0;
}

function changeFont(font) {
  const line = getLine();
  line.font = font;
}

gSaved = getSaved();
function save(canvas) {
  gSaved.push(canvas);
  saveToStorage(KEY, gSaved);
  console.log('gSaved', gSaved);
}

function getSaved() {
  const saved = loadFromStorage(KEY);
  console.log('saved', saved);
  if (!saved) return [];
  return saved;
}

function getKeywords() {
  return gKeywordSearchCountMap;
}

function setFilter(keyword) {
  console.log(keyword);
  gFilterBy = keyword;
  console.log('setFilter', gFilterBy);
}
