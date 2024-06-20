`label`标记语句和`break`或`continue`语句一起使用，可以跳出循环或者中断循环

```javascript
// label 和 break 语句
outerLoop: for(let i = 0; i < 10; i ++) {
  console.log('结束外层循序')
  for(let j = 0; j < 5; j++) {
    console.log('结束内层循环')
    break outerLoop
  }
}

// label 和 continue 语句
let str = '';
loop1: for (let i = 0; i < 5; i++) {
  if (i === 1) {
    continue loop1;
  }
  str = str + i;
}

console.log(str); // ‘0234’
```