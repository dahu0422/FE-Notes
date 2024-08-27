/**
 * @desc: 函数只执行一次
 * @param {function} fn
 * @returns {function}
 */
function once(fn) {
  let done = false;
  return function () {
    if (!done) {
      done = true;
      return fn.apply(this, arguments);
    }
  };
}

const pay = once((money) => `支付了${money}元`);
let result1 = pay(10);
let result2 = pay(20);
let result3 = pay(30);
console.log(result1, result2, result3); // 支付了10元 undefined undefined
