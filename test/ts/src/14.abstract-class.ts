// 抽象类

export {}

abstract class Animal {
  protected name: string

  constructor(name: string) {
    this.name = name
  }

  // 抽象方法
  abstract makeSound(): void

  // 非抽象方法
  move(distanceInMeters: number = 0): void {
    console.log(`${this.name} moved ${distanceInMeters}m.`)
  }
}

class Dog extends Animal {
  constructor(name: string) {
    super(name)
  }

  // 实现抽象方法
  makeSound(): void {
    console.log('Woof!')
  }
}

// 创建一个 Dog 类的实例
let dog = new Dog('Rover')
dog.makeSound() // 输出: Woof!
dog.move(5) // 输出: Rover moved 5m.
