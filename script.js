const container = document.getElementById("container");
const startBtn = document.getElementById("start-btn");
const arrSize = document.getElementById("size");
const displayBtn = document.getElementById("display");
const speedEl = document.getElementById("speed");
const algoEl = document.getElementById("algo");
const stopEl = document.getElementById("stop");
const block = document.get;

/**
 *      VARIABLES
 */

const arr = [];
let algo = "bubble";
let speed = 5;
let isRunning = false;
/**
 *      EVENT LISTENERS
 */

stopEl.addEventListener("click", () => {
  isRunning = !isRunning;
});

algoEl.addEventListener("change", (e) => {
  algo = e.target.value;
});

speedEl.addEventListener("change", (e) => {
  speed = +e.target.value;
  console.log(speed);
});

startBtn.addEventListener("click", (e) => {
  isRunning = true;
  switch (algo) {
    case "quick":
      quickSort(arr, 0, arr.length - 1);
      break;
    case "bubble":
      bubblesort(arr);
      break;
    case "merge":
      mergesort(arr, 0, arr.length - 1);
      break;
    default:
      break;
  }
});

displayBtn.addEventListener("click", () => {
  let size = +arrSize.value;
  size = size > 500 ? 500 : size;
  while (arr.length < size) {
    let t = Math.trunc(Math.random() * 10);
    if (t > 0) arr.push(t);
  }
  renderArr(arr);
});

/**
 *      HELPER FUNCTIONS
 */

function renderArr(arr, color = "red") {
  container.innerHTML = "";
  for (let h of arr) {
    const block = document.createElement("div");
    block.style.height = `${h * 50}px`;
    block.className = "block";
    block.style.backgroundColor = color;
    container.appendChild(block);
  }
}

function wait(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

/**
 *      SORTING LOGIC
 */

async function bubblesort(arr) {
  isRunning = true;
  let n = arr.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (!isRunning) return;
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        renderArr(arr);
        await wait(speed);
      }
    }
  }
}

async function findPivot(arr, s, e) {
  let pivotEl = arr[e];
  let idx = s;

  for (let i = s; i < e; i++) {
    if (arr[i] < pivotEl) {
      [arr[i], arr[idx]] = [arr[idx], arr[i]];
      idx++;
    }
    renderArr(arr);
    await wait(speed);
  }

  [arr[idx], arr[e]] = [arr[e], arr[idx]];
  renderArr(arr);
  await wait(speed);
  return idx;
}
async function quickSort(arr, s, e) {
  if (!isRunning) return;
  if (s >= e) return;
  let pivot = await findPivot(arr, s, e);
  quickSort(arr, s, pivot - 1);
  quickSort(arr, pivot + 1, e);
}

async function merge(arr, s, mid, e) {
  let i = s,
    j = mid + 1;
  temp = [];
  while (i <= mid && j <= e) {
    if (arr[i] < arr[j]) {
      temp.push(arr[i]);
      i++;
    } else {
      temp.push(arr[j]);
      j++;
    }
  }

  while (i <= mid) temp.push(arr[i++]);
  while (j <= e) temp.push(arr[j++]);

  let k = 0;
  for (let x = s; x <= e; x++) {
    arr[x] = temp[k++];
    renderArr(arr);
    await wait(speed);
  }
}

async function mergesort(arr, s, e) {
  if (s >= e) return;

  let mid = s + (e - s) / 2;
  mergesort(arr, s, mid);
  mergesort(arr, mid + 1, e);
  merge(arr, s, mid, e);
}
