window.addEventListener("DOMContentLoaded", () => {
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
  const audioEl = document.getElementById("beep-audio");

  /**
   *      VARIABLES
   */
  let prevArr = [];
  let arr = [];
  let algo = "bubble";
  let speed = 5;
  let isRunning = false;
  let isDone = false;
  let size = 0;
  let orgArr = [];
  let keepRunning = true;
  let stoppedDuringExec = false;
  /**
   *      EVENT LISTENERS
   */

  showOrig.addEventListener("click", () => {
    if (prevArr.length > 0) {
      isRunning = false;
      keepRunning = false;
      renderArr(prevArr, "red");
    }
  });

  stopEl.addEventListener("click", () => {
    isRunning = !isRunning;
    keepRunning = false;
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
    if (isRunning) {
      // controls.style.marginBottom = "0px";
      warningMsg.forEach((el) => (el.style.display = "block"));
      await wait(3000);
      warningMsg.forEach((el) => (el.style.display = "none"));
    } else size = +e.target.value;
  });

  startBtn.addEventListener("click", async (e) => {
    if (isRunning) return;
    if (!arr.length) {
      alert("You need to generate your array first");
      return;
    }
    isRunning = true;
    keepRunning = true;
    setTimeout(() => {
      renderArr(arr);
    }, 1000);
    await startApp(algo);
  });

  displayBtn.addEventListener("click", () => {
    populateArr(size);
    prevArr = [...arr];
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
    // orgArr = [...arr];
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
      case "insertion":
        await insertionSort(arr);
        break;
      case "selection":
        await SelectionSort(arr);
        break;
      default:
        break;
    }
    keepRunning = true;
    renderArr(arr, "orange");
    console.log("completed");
    isRunning = false;
  }

  function playBeep() {
    audioEl.playbackRate = 2;
    audioEl.play();
  }

  /**
   *      SORTING LOGIC
   */
  async function bubblesort(arr) {
    isRunning = true;
    let n = arr.length;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        while (!isRunning) await wait(10);
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          if (keepRunning) renderArr(arr);
          await wait(speed);
        }
      }
    }
  }

  async function findPivot(arr, s, e) {
    let pivotEl = arr[e];
    let idx = s;

    for (let i = s; i < e; i++) {
      while (!isRunning) await wait(10);
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
    if (!keepRunning) return;
    if (s >= e) return;
    while (!isRunning) await wait(10);

    let pivot = await findPivot(arr, s, e);
    await quickSort(arr, s, pivot - 1);
    await quickSort(arr, pivot + 1, e);
  }

  async function SelectionSort(arr) {
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
      let minIndex = i;
      for (let j = i + 1; j < n; j++) {
        while (!isRunning) await wait(10);
        if (arr[j] < arr[minIndex]) {
          minIndex = j;
        }
      }
      if (minIndex !== i) {
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
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
      while (!isRunning) await wait(10);
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
      while (!isRunning) await wait(10);
      playBeep();
      arr[x] = temp[k++];
      renderArr(arr);
      await wait(speed);
    }
  }

  async function mergesort(arr, s, e) {
    if (s >= e || !keepRunning) return;
    while (!isRunning) await wait(10);

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
        while (!isRunning) await wait(10);
        playBeep();
        [arr[j], arr[k]] = [arr[k], arr[j]];
        renderArr(arr);
        await wait(speed);
        j--;
        k--;
      }
    }
  }
});
