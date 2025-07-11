const container = document.getElementById("container");
const startBtn = document.getElementById("start-btn");
const arrSizeEL = document.getElementById("size");
const displayBtn = document.getElementById("display");
const speedEl = document.getElementById("speed");
const algoEl = document.getElementById("algo");
const stopEl = document.getElementById("stop");
const showOriginalBtn = document.getElementById("show-original-btn");
const controls = document.querySelector(".controls");
const warningMsg = document.querySelectorAll(".warning-msg");
const showOrig = document.querySelector(".show-original-btn");

/**
 *      VARIABLES
 */
let prevArr = [];
let arr = [];
let algo = "bubble";
let speed = 5;
let size = 0;
let stoppedDuringExec = false;
let currentlyWorking = false;
let keepRunning = true;
let displayOrigArray = false;
/**
 *      EVENT LISTENERS
 */

showOrig.addEventListener("click", (e) => {
  e.preventDefault();
  if (!currentlyWorking) {
    alert("You need to generate your array first dude !");
    return;
  }
  if (prevArr.length > 0) {
    displayOrigArray = true;
  }
});

stopEl.addEventListener("click", (e) => {
  e.preventDefault();
  if (keepRunning) {
    e.target.textContent = "Resume";
  } else e.target.textContent = "Pause";
  keepRunning = !keepRunning;
  if (!arr.length) {
    alert("Generate the array First");
  }
});

algoEl.addEventListener("change", (e) => {
  algo = e.target.value;
});

speedEl.addEventListener("change", (e) => {
  speed = +e.target.value;
  console.log(speed);
});

arrSizeEL.addEventListener("change", async (e) => {
  e.preventDefault();
  if (currentlyWorking) {
    controls.style.marginBottom = "0px";
    warningMsg.forEach((el) => (el.style.display = "block"));
    await wait(3000);
    warningMsg.forEach((el) => (el.style.display = "none"));
  }
  size = +e.target.value;
});

startBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  if (currentlyWorking) {
    alert("Sorting is currently going on dude");
    return;
  }
  if (!arr.length) {
    alert("You need to generate your array first dude");
    return;
  }
  currentlyWorking = true;
  await startApp(algo);
  currentlyWorking = false;
});

displayBtn.addEventListener("click", (e) => {
  e.preventDefault();
  populateArr(size);
  prevArr = arr.map((x) => x);
  renderArr(arr);
});

// showOriginalBtn.addEventListener("click", () => {
//   console.log("show");
//   renderArr(orgArr);
// });

/**
 *      HELPER FUNCTIONS
 */

function renderArr(arr, color = "red") {
  console.log(arr === prevArr);
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
  if (!len) len = 20;
  len = len > 500 ? 200 : len;
  while (arr.length < len) {
    let t = Math.trunc(Math.random() * 10);
    if (t > 0) arr.push(t);
  }
}

async function startApp(algo) {
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
    case "insertion":
      await insertionSort(arr);
      break;
    case "selection":
      await SelectionSort(arr);
      break;
    default:
      break;
  }
}

/**
 *      SORTING LOGIC
 */
async function bubblesort(arr) {
  let n = arr.length;
  for (let i = 0; i < n; i++) {
    if (displayOrigArray) {
      currentlyWorking = false;
      arr = [...prevArr];
      renderArr(prevArr);
      displayOrigArray = false;
      return;
    }
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        while (!keepRunning) await wait(10);
        renderArr(arr);
        await wait(speed);
      }

      if (displayOrigArray) {
        currentlyWorking = false;
        arr = [...prevArr];
        // console.log(prevArr, arr);
        renderArr(prevArr);
        displayOrigArray = false;
        return;
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
    while (!keepRunning) await wait(10);
    if (displayOrigArray) {
      currentlyWorking = false;
      renderArr(prevArr);
      return;
    }
    renderArr(arr);
    await wait(speed);
  }

  [arr[idx], arr[e]] = [arr[e], arr[idx]];
  if (displayOrigArray) {
    currentlyWorking = false;
    renderArr(prevArr);
    return;
  }
  renderArr(arr);
  await wait(speed);
  return idx;
}

async function quickSort(arr, s, e) {
  if (s >= e) return;

  let pivot = await findPivot(arr, s, e);
  await quickSort(arr, s, pivot - 1);
  await quickSort(arr, pivot + 1, e);
}

async function SelectionSort(arr) {
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
      while (!keepRunning) await wait(10);
      if (displayOrigArray) {
        currentlyWorking = false;
        renderArr(prevArr);
        return;
      }
      await wait(speed);
      renderArr(arr);
    }
  }
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
    while (!keepRunning) await wait(10);
    if (displayOrigArray) {
      currentlyWorking = false;
      renderArr(prevArr);
      return;
    }
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

async function insertionSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let j = i - 1;
    let k = i;

    while (j >= 0 && arr[j] > arr[k]) {
      [arr[j], arr[k]] = [arr[k], arr[j]];
      while (!keepRunning) await wait(10);
      if (displayOrigArray) {
        currentlyWorking = false;
        renderArr(prevArr);
        return;
      }
      renderArr(arr);
      await wait(speed);
      j--;
      k--;
    }
  }
}
