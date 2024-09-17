# es6 中的 Class 和 Function 构造函数的区别

## 1. class 必须通过 new 来调用，Function 具有两义性，既可以作为普通函数调用又可以作为构造函数

```js
class Person {
  constructor(name) {
    this.name = name;
  }

  say() {
    console.log(`My name is ${this.name}`);
  }
}
// Person
const p = new Person("大户");
p.say();
```

## 2. class 不存在变量提升

```js
// const child = new Child("小户", 5); // Error

class Child extends Person {
  constructor(name, age) {
    super(name);
    this.age = age;
  }

  say() {
    console.log(`My name is ${this.name}, I am ${this.age} years old`);
  }
}

const child = new Child("小户", 5);
child.say();
```

## 3. class 不会便利原型链上的属性和方法

```js
for (let key in child) {
  console.log(key); // name age 没有 say
}

function Teacher(name, subject) {
  this.name = name;
  this.subject = subject ?? "math";
}

Teacher.prototype.say = function () {
  console.log(`My name is ${this.name}, I am a teacher of ${this.subject}`);
};

const teacher = new Teacher("teacher", "english");
for (let key in teacher) {
  console.log(key); // name subject say
}
```

## 4. class 类有 static 静态变量，静态变量只能通过类调用，不会出现在实例上。

```js
class Programmer {
  static name = "Programmer";

  static say() {
    console.log(`I am ${this.name}`); // this 指向 Programmer 类
  }
}

Programmer.say();
```
