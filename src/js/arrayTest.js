let data = require("../data/columnChartData.json");

let arr = Array(8)
  .fill()
  .map((_, i) => i * i);
console.log(arr);

let arr2 = Array(8).fill();

console.log(arr2);
// console.log(data);

let arr3 = data.map(e => e);
arr3.splice(0, 1);
console.log(arr3);
let arr4 = Array(60)
  .fill()
  .map((_, i) => [i, (i % 3) + 2, (i % 2) + 2, (i % 7) + 1]);
console.log("--- ");
Array(10)
  .fill()
  .map((_, i) => console.log(_, i));
console.log();
console.log("--- ");
console.log(arr4);
let arr6 = [...arr4];
console.log(arr6);

let arr7 = [[0, 1, 2]];
let arr8 = [[3, 4, 5]];
// let arr9 = arr7.concat(arr8);
let arr9 = [...arr7, ...arr8];
console.log(arr9);
let arr10 = [6, 7, 8];

let arr11 = [10, ...arr10];
console.log(arr11);
