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
