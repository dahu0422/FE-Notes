console.log(Symbol('foo') === Symbol('foo'))
console.log(Symbol.for('foo') === Symbol.for('foo'))
console.log(Symbol.for(true) === Symbol.for('true'))

const obj = {
  [Symbol.toStringTag]: 'XObject',
}
console.log(obj.toString())
