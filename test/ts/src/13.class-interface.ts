export {}

// interface EatAndRun {
//   eat: (food: string) => void
//   run: (distance: number) => void
// }

interface Eat {
  eat(food: string): void
}

interface Run {
  run(distance: number): void
}

class Person implements Eat, Run {
  eat(food: string) {
    console.log(`吃${food}`)
  }
  run(distance: number) {
    console.log(`跑${distance}米`)
  }
}

class Dog implements Eat, Run {
  eat(food: string) {
    console.log(`大口吃${food}`)
  }
  run(distance: number) {
    console.log(`爬行${distance}米`)
  }
}
