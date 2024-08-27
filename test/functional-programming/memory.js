function memory(func) {
  // TODO
}

function add(a, b) {
  console.log("exec");
  return new Promise((resolve, reject) => {
    resolve(a + b);
  });
}

console.log(await memory(add)(1, 2)); // exec
console.log(await memory(add)(3, 4)); // exec
console.log(await memory(add)(1, 2));
