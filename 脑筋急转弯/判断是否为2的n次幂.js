function isPowerOf2(x) {
  return (x & (x - 1)) === 0
}

// 按位与（&）运算符在两个操作数对应的二进位都为 1 时，该位的结果值才为 1。
;```javascript
const a = 4; // 100
const b = 3; // 011
console.log(a & b); // 000

const c = 100; // 1100100
const d = 99; // 1100011
console.log(c & d); // 1100000
```
