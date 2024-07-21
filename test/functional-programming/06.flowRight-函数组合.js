const _ = require('lodash')
const reverse = (array) => array.reverse()
const first = (array) => array[0]
const toUpper = (str) => str.toUpperCase()

// lodash
// const toUpperLast = _.flowRight(toUpper, first, reverse)

function myFlowRight(...fns) {
  return function (value) {
    return fns.reduceRight((acc, fn) => fn(acc), value)
  }
}
const toUpperLast = myFlowRight(toUpper, first, reverse)

const res = toUpperLast(['a', 'b', 'c'])
console.log(res) // C
