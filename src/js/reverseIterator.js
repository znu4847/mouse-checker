let arr = [1, 2, 3, 4, 5];
let index = arr.length;

// Custom iterator
let reversedIterator = {
  next: function() {
    index--;
    return {
      done: index < 0,
      value: arr[index]
    };
  }
};

reversedIterator[Symbol.iterator] = function() {
  return this;
};

for (let i of reversedIterator) {
  console.log(i);
}
console.log("---");
for (let j of arr) {
  console.log(j);
}
