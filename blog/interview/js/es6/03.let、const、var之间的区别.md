# let、const、var 之间的区别
`let`、`const`、`var` 都是用来声明变量的关键字，区别主要在作用域、变量提升、重新声明和赋值规则。
## 作用域
- `let` 和 `const`: 具有块作用域，变量仅在声明它们的代码块（如if语句、for循环、大括号包围的任何区域）内可见。
- `var`: 具有函数作用域，在函数内部声明的变量在整个函数体内都是可见的。如果在全局作用域中声明，则变为全局变量。
```javascript
if (true) {
  let x = 1;
  const y = 2;
  console.log(x); // 1
  console.log(y); // 2
}
console.log(x); // ReferenceError: x is not defined
console.log(y); // ReferenceError: y is not defined

if(true) {
  var z = 3;
  console.log(z); // 3
}
console.log(z); // 3
```

## 变量提升
- `let` 和 `const`: 不会发生变量提升。尝试在声明之前访问这些变量会导致引用错误（ReferenceError），因为它们在声明之前处于“暂时性死区”（Temporal Dead Zone, TDZ）。
- `var`: 发生变量提升，这意味着变量可以在声明之前被引用，但在声明之前引用时，其值会被提升为undefined。
```javascript
console.log(x); //  Uncaught ReferenceError: Cannot access 'x' before initialization (let 无提升)
console.log(y); // Uncaught ReferenceError: 'y' is not defined (const 无提升)
let x = 1;
const y = 2;

console.log(z); // undefined (var 有提升)
var z = 3;
```

## 重新声明
`let` 和 `const`: 不允许在同一个作用域内重新声明同一个变量。尝试这样做会抛出一个语法错误（SyntaxError）。
`var`: 允许在同一个作用域内多次声明同一个变量，后一次声明会覆盖前一次声明的变量值。
```javascript
var a = 10;
var a = 20; // 后一个声明覆盖了前一个，现在 a 的值是 20

let b = 10;
let b = 20; // Uncaught SyntaxError: Identifier 'b' has already been declared

const c = 10;
const c = 20; // Uncaught SyntaxError: Identifier 'c' has already been declared
```

## 赋值规则
`var` 和 `let`: 声明变量可以重新赋值。
`const`: 声明的是常量，一旦赋值后不能重新赋值。但是，如果const声明的是一个对象或数组，那么对象或数组的属性是可以改变的，只是不能让const引用指向一个新的值。
```javascript
const d = [1, 2, 3];
d.push(4); // 允许修改数组的属性
const d = [1, 2, 3, 4]; // TypeError: Assignment to constant variable.
```
