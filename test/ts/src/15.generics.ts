// 泛型

function createArray<T>(length: number, value: T): T[] {
  return Array<T>(length).fill(value)
}

const res = createArray<string>(3, 'x')
