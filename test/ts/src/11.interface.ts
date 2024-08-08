export {}

interface NameInterface {
  name: string
  age?: number // 可选属性
  [propName: string]: any // 任意属性任意类型
}

let nameObj: NameInterface = {
  name: '大户',
  age: 18,
  sex: '男',
}
