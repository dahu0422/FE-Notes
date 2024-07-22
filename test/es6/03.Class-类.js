// function Person(name, age) {
//   this.name = name
//   this.age = age
// }

// Person.prototype.say = function () {
//   console.log(this.name + ' say hello')
// }

class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  say() {
    console.log(this.name + ' say hello')
  }
  static create(name) {
    return new Person(name)
  }
}

class Student extends Person {
  constructor(name, number) {
    super(name)
    this.number = number
  }

  hello() {
    super.say()
    console.log(`my school number is ${this.number}`)
  }
}

// 调用方式：
// - 实例方法必须通过类的实例来调用。
// - 静态方法可以直接通过类名调用，不需要实例化类。
