const container = document.getElementById("container");
const startBtn = document.getElementById("start-btn");
const arrSizeEL = document.getElementById("size");
const displayBtn = document.getElementById("display");
const speedEl = document.getElementById("speed");
const algoEl = document.getElementById("algo");
const stopEl = document.getElementById("stop");
const showOriginalBtn = document.getElementById("show-original-btn");

/**
 *      VARIABLES
 */
let arr = [];
let algo = "bubble";
let speed = 5;
let isRunning = false;
let size = 0;
let orgArr = [];
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

arrSizeEL.addEventListener("change", (e) => {
  size = +e.target.value;
});

startBtn.addEventListener("click", async (e) => {
  if (isRunning) return;
  populateArr(size);
  setTimeout(() => {
    renderArr(arr);
  }, 1000);
  startApp(algo);
});

displayBtn.addEventListener("click", () => {
  populateArr(size);
  renderArr(arr);
});

showOriginalBtn.addEventListener("click", () => {
  console.log("show")
  renderArr(orgArr);
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

function populateArr(len) {
  arr = [];
  len = len > 500 ? 500 : len;
  while (arr.length < len) {
    let t = Math.trunc(Math.random() * 10);
    if (t > 0) arr.push(t);
  }
  orgArr = arr;
}

async function startApp(algo) {
  isRunning = true;
  switch (algo) {
    case "quick":
      await quickSort(arr, 0, arr.length - 1);
      break;
    case "bubble":
      await bubblesort(arr);
      break;
    case "merge":
      await mergesort(arr, 0, arr.length - 1);
      break;
    default:
      break;
  }
  renderArr(arr, "orange");
  console.log("completed");
  isRunning = false;
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
  await quickSort(arr, s, pivot - 1);
  await quickSort(arr, pivot + 1, e);
}

async function merge(arr, s, mid, e) {
  let i = s;
  let j = mid + 1;
  let temp = [];
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

  let mid = Math.floor(s + (e - s) / 2);
  await mergesort(arr, s, mid);
  await mergesort(arr, mid + 1, e);
  await merge(arr, s, mid, e);
}
