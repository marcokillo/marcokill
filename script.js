
const puzzle = document.getElementById('puzzle');
const message = document.getElementById('message');

let dragSrcEl = null;

function initPuzzle() {
  puzzle.innerHTML = "";
  message.textContent = "";
  const indices = [...Array(9).keys()];
  shuffle(indices);

  indices.forEach((index, i) => {
    const tile = document.createElement("div");
    tile.className = "tile";
    tile.draggable = true;
    tile.dataset.index = index;
    tile.dataset.position = i;

    const img = document.createElement("img");
    img.src = `tiles/tile-${index}.jpg`;
    img.alt = `Tile ${index}`;

    tile.appendChild(img);
    puzzle.appendChild(tile);
  });

  addEvents();
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function addEvents() {
  const tiles = document.querySelectorAll(".tile");

  tiles.forEach(tile => {
    tile.addEventListener("dragstart", function () {
      dragSrcEl = this;
      this.classList.add("dragging");
    });

    tile.addEventListener("dragover", function (e) {
      e.preventDefault();
    });

    tile.addEventListener("dragenter", function () {
      this.classList.add("over");
    });

    tile.addEventListener("dragleave", function () {
      this.classList.remove("over");
    });

    tile.addEventListener("drop", function (e) {
      e.preventDefault();
      if (dragSrcEl !== this) {
        const srcImg = dragSrcEl.querySelector("img");
        const tgtImg = this.querySelector("img");

        // swap images and data-index
        const tempSrc = srcImg.src;
        const tempIdx = dragSrcEl.dataset.index;

        srcImg.src = tgtImg.src;
        dragSrcEl.dataset.index = this.dataset.index;

        tgtImg.src = tempSrc;
        this.dataset.index = tempIdx;

        checkWin();
      }
      this.classList.remove("over");
      dragSrcEl.classList.remove("dragging");
    });

    tile.addEventListener("dragend", function () {
      this.classList.remove("dragging");
    });
  });
}

function checkWin() {
  const tiles = document.querySelectorAll(".tile");
  const isSolved = [...tiles].every((tile, i) => tile.dataset.index == i);
  if (isSolved) {
    message.textContent = "🎉 پازل با موفقیت کامل شد!";
  }
}

window.onload = initPuzzle;
