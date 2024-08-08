# TypeScript

## 强类型 与 弱类型

### 强类型

强类型语言是指那些在编译时就对变量的**数据类型**进行严格检查的语言。变量一旦被赋予了特定类型，就**不能隐式的转换**为另一种类型。

```java
class Main {
  static void foo (int num) {
    System.out.println(num);
  }
}

public static void main(String[] args) {
  Main.foo(100) // ok
  Main.foo("100") // error 
  Main.foo(Interger.parseInt("100")) // ok
}
```

### 弱类型

弱类型语言允许变量在不同类型之间的自动转化。在弱类型语言中，变量的类型在运行时**可以隐式的转换**为其他类型。

```js
function foo (num) {
  console.log(num)
}

foo(100) // ok
foo("100") // ok
```

## 静态类型 与 动态类型

### 静态类型

静态类型语言是在**编译时检查**变量类型的语言。

### 动态类型

动态类型语言是在**运行时检查**变量类型的语言

## TypeScript 概述

TypeScript 是 JavaScript 的超集，它可以编译成 JavaScript。

TypeScript 的特性：

- 静态类型检查：TypeScript 允许在开发过程中指定变量、参数、返回值的类型。编译器会在编译阶段检查类型错误，帮助开发者避免运行时错误。
- 面向对象编程：TypeScript 支持类、接口、抽象类、枚举、模块等面向对象编程的特性。
- 模块化：TypeScript 支持 ES6 模块化开发，可以按需导入和导出模块。

## 使用 TypeScript

安装 TypeScript：

```bash
npm install -g typescript
```

初始化项目

```bash
mkdir my-ts-project
cd my-ts-project
npm init -y

tsc --init
```

编写 TypeScript 代码，在项目中创建一个 .ts 扩展名的文件

```typescript
// hello.ts
const message: string = 'Hello TypeScript!';
console.log(message);
```

编译 TypeScript 代码

```bash
tsc hello.ts
```

## Primitive Types 基本类型

```ts
const a: string = 'hello'

const b: number = 123

const c: boolean = true

const e: void = undefined // 可以存放 undefined 或者 null

const f: null = null

const g: undefined = undefined

const h: symbol = Symbol()

```

## Object Types 对象类型

### 匿名对象类型

```ts
const person: { name: string; age: number } = {
  name: 'John',
  age: 25
}
```

## Array Types 数组类型

### 使用类型后缀 []

```ts
let numbers: number[] = [1, 2, 3]
let string2: string[] = ['a', 'b', 'c']
```

### 使用数组泛型 Array<元素类型>

```ts
let numbers: Array<number> = [1, 2, 3]
let strings: Array<string> = ['a', 'b', 'c']
```

### 使用联合类型

```ts
let mixed: (string | number)[] = ['a', 1, 'b', 2]
```

### 使用 Tuple

```ts
let person: [string, number] = ['John', 25]
```

## 元祖 tuple

元祖 tuple 是 TypeScript 中的一种特殊的数组类型，它允许指定元素数量和类型的数组，元祖中每个位置是固定的。

```ts
let arr :[string, number] = ['a', 1]
```

可以在元祖中定义可选元素，一旦定义了一个可选元素，那么该元素后续所有元素必须都是可选的。

```ts
let arr: [string, number?, boolean?]
arr = ['hello', 10] // 正确
arr = ['hello'] // 正确
arr = ['hello', 10, true] // 正确
arr = ['hello', , true] // 错误，因为 true 应该放在 10 的位置
```

## 枚举 enum

枚举 enum 是 TypeScript 中的一种数据类型，它允许我们定义一组命名的常量，这些常量的值是数字或者字符串。

```ts
enum status {
  Draft = 0,
  Unpublished = 1,
  Published = 2
}

const article = {
  title: 'Hello World',
  status: status.Published
}
```

如果不给枚举成员指定值，那么编译器会自动为它们赋值，从 0 开始递增。

```ts
enum status {
  Draft, // 0
  Unpublished, // 1
  Published // 2
}

可以通过`.`或者`[]`访问
```ts
console.log(status.Draft)
console.log(status['Draft'])
```

## 函数类型

函数类型可以定义函数的参数和返回值类型。有助于确保函数调用时传入正确的参数类型，并且函数返回预期类型的值。

### 函数声明

```ts
function func1(a: number, b: number = 10, ...rest: number[]): string {
  return 'func1'
}

func1(100, 200)

func1(100)

func1(100, 200, 300)
```

### 函数表达式

```ts
const func2: (a: number, b: number) => string = function (a: number, b: number): string {
  return 'func2'
}
```

## 任意类型 any

any 类型表示任意类型，它可以接受任何类型的值，并且可以赋值给任何类型。

当你不确定某个值的确切类型时，或者不想让 TypeScript 对某个值进行类型检查时，可以使用 any 类型。

```ts
let c: any;
c = 10;
c = "Hello";
c = true;
```

## 隐式类型推断

TypeScript 可以根据赋值表达式的类型自动推断变量的类型。

```ts
let message = "hello"; // 类型被推断为 string

let obj = { name: "Alice", age: 30 }; // 类型被推断为 { name: string, age: number }

let numbers = [1, 2, 3]; // 类型被推断为 number[]
```

## 类型断言

类型断言是一种告诉编译器你希望将某个值视为特定类型的手段。类型断言不会改变运行时的值，仅在编译阶段起作用，并不执行任何运行时的操作或检查。

类型断言有两种形式：

1. `as` 语法：值 as 类型
2. `<类型>值`

使用场景

- 当 TypeScript 编译器无法准确推断出一个值的具体类型，可以通过类型断言明确指出该值的类型
- 处理 DOM API 或者 第三方库返回值的时候，这些值肯能被标记成 any 或者其他宽泛的类型，这时候可以使用类型断言来指定具体的类型
- 从联合类型中选择一个子类型时
-

```ts
function getValue(): number | string {
  return Math.random() > 0.5 ? 'hello' : 123;
}

const value = getValue();
const text = (value as string).toUpperCase();  // 或者使用 <string>value
```

## 接口 interface

接口用于描述对象的形状，包括对象应该具有的属性、方法和他们的类型。

```ts
interface NameInterface {
  name: string;
  age?: number; // 可选属性
  [propName: string]: any // 任意属性任意类型
}
```

可选属性：在接口中，通过在属性后面加 `?` 来表示该属性是可选的。

任意属性：在接口中，通过添加一个额外的属性名 `[propName: string]: any` 来表示该接口可以有任意数量的属性，并且这些属性的类型都是任意的。

只读属性：使用 readonly 关键字来表示属性是只读的。

```ts
interface Point {
  readonly x: number;
  readonly y: number;
}
```

扩展接口：接口可以被扩展以继承其他接口的成员

```ts
interface Shape {
  color: string;
}

interface Square extends Shape {
  sideLength: number;
}
```

## 类

基本使用：成员变量、构造函数

```ts
class Person {
  name: string
  age: number

  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }

  sayHi(msg: string): void {
    console.log(`I am ${this.name}, ${msg}`)
  }
}
```

成员访问修饰符

- public：公有，可以在任何地方访问
- private：私有，只能在类的内部访问
- protected：受保护，只能在类的内部和子类中访问

```ts
class Person {
  public name: string
  private age: number
  protected sex: string

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
    console.log(this.sex) // 可以访问
  }
}

const tom = new Person('tom', 18)
console.log(tom.name)
// console.log(tom.age) // 报错 私有成员
// console.log(tom.sex) // 报错 受保护成员

```

只读属性

```ts
protected readonly sex: string
```

## 抽象类 abstract class

抽象类是一种特殊的类型，它不能被实例化，只能作为其他类的基础。

```ts
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

```

## 泛型 generics

泛型的基本思想是在定义函数、类或接口时使用类型参数来指定一个或多个类型占位符，然后在实际使用时再指定具体的类型。

```ts
function identity<T>(arg: T) : T {
  return arg
}
```s

```ts
function createArray<T>(length: number, value: T): T[] {
  return Array<T>(length).fill(value)
}

const res = createArray<string>(3, 'x')

```
