function merge(arr1 , arr2){
  let i = 0;
  let j = 0;
  let temp = [];
  while(i<arr1.length && j<arr2.length){
    if(arr1[i]>arr1[j]){
      temp.push(arr[j]);
      j++;
    }
    else{
      temp.push(arr[i]);
      i++;
    }
  }
  return temp;
}


function MergeSort(arr){
 let len = arr.length;
 let a = Math.floor(len / 2);
let b = len - a;
let first = [...arr.slice(0, a)];
let second = [...arr.slice(a)];

MergeSort(first);
MergeSort(second);

return merge(first , second);
}