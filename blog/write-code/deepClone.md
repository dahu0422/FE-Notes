# 深拷贝

深拷贝原理：创建一个新对象，并且递归的复制对象的所有属性。对于每个引用类型的属性，会创建一个新的实例，并复制其内容，确保原对象与拷贝对象之间完全独立。

```javascript
function deepClone(obj, hash = new WeakMap()) {
  // 基本类型、function、自身引用直接返回
  if (typeof obj !== "object" || obj === null) return obj;
  if (hash.has(obj)) return hash.get(obj);

  // 创建对象并设置原型
  let cloneObj = new obj.constructor();

  // 将当前 obj 与克隆结果存入 hash 表，解决循环引用
  hash.set(obj, cloneObj);

  // 判断是 Map 类型
  if (obj instanceof Map) {
    for (let [key, value] of obj) {
      cloneObj.set(key, deepClone(value, hash));
    }
    hash.set(obj, cloneObj);
  } else if (obj instanceof Set) {
    // 判断是 Set 类型
    for (let value of obj) {
      cloneObj.add(deepClone(value, hash));
    }
  } else if (Array.isArray(obj)) {
    // 判断是数组类型
    for (let item of obj) {
      cloneObj.push(deepClone(item, hash));
    }
  } else {
    // 判断是普通对象类型
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        cloneObj[key] = deepClone(obj[key], hash);
      }
    }
  }
  return cloneObj;
}
// test1
const original = {
  name: "Alice",
  age: 30,
  hobbies: ["basketball", "football"],
  friends: new Map([
    [1, "Bob"],
    [2, "Charlie"],
  ]),
  courses: new Set(["math", "english", "science"]),
  details: {
    address: "123 Main St",
    phone: "555-1234",
    email: ["alice@example.com"],
  },
};

// test2：循环引用
original.cycleObj = original;
original.cycleObj2 = original.details;

// test3：自定义对象
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

const p = new Person("John", 25);
original.person = p;

const cloned = deepClone(original);
cloned.details.email.push("alice2@example.com");
console.log(cloned, original);
```

为了解决**循环引用**的问题，使用 WeakMap 来存储已经拷贝过的对象，如果遇到循环引用，则直接返回该对象。
