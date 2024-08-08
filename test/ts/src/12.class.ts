class Person {
  public name: string
  private age: number
  protected readonly sex: string

  constructor(name: string, age: number) {
    this.name = name
    this.age = age
    this.sex = 'male'
  }

  sayHi(msg: string): void {
    console.log(`I am ${this.name}, ${msg}`)
    console.log(this.age)
  }
}

class Student extends Person {
  constructor(name: string, age: number) {
    super(name, age)
    console.log(this.sex)
  }
}

const tom = new Person('tom', 18)
console.log(tom.name)
// console.log(tom.age)
// console.log(tom.sex)
