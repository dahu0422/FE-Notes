const person = {
  name: 'dahu',
  age: 18,
}

const personProxy = new Proxy(person, {
  get(target, property) {
    return property in target ? target[property] : 'not found'
  },
  set(target, property, newValue) {
    if (property === 'age' && !Number.isInteger(newValue)) {
      throw new TypeError('age must be integer')
    }
    target[property] = newValue
  },
})

personProxy.age = 100
personProxy.gender = 'male'

console.log(personProxy.name) // dahu
console.log(personProxy.xxx) // not found
console.log(person) // { name: 'dahu', age: 100, gender: 'male' }
