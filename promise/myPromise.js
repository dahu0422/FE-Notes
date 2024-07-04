class myPromise {
  static PENDING = 'pending'
  static FULFILLED = 'fulfilled'
  static REJECTED = 'rejected'

  constructor(executor) {
    try {
      executor(this.resolve, this.reject)
    } catch (error) {
      this.reject(error)
    }
  }

  promiseState = myPromise.PENDING
  promiseResult = null
  onFulfilledCallbacks = []
  onRejectedCallbacks = []

  resolve = (value) => {
    if (this.promiseState !== myPromise.PENDING) return
    this.promiseState = myPromise.FULFILLED
    this.promiseResult = value
    while (this.onFulfilledCallbacks.length) this.onFulfilledCallbacks.shift()()
  }
  reject = (reason) => {
    if (this.promiseState !== myPromise.PENDING) return
    this.promiseState = myPromise.REJECTED
    this.promiseResult = reason
    while (this.onRejectedCallbacks.length) this.onRejectedCallbacks.shift()()
  }

  then(onFulfilled, onRejected) {
    onFulfilled =
      typeof onFulfilled === 'function' ? onFulfilled : (value) => value
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (reason) => {
            throw reason
          }
    let promise = new myPromise((resolve, reject) => {
      if (this.promiseState === 'fulfilled') {
        setTimeout(() => {
          try {
            // if (typeof onFulfilled !== 'function') {
            //   resolve(this.promiseResult)
            // } else {
            let x = onFulfilled(this.promiseResult)
            resolvePromise(promise, x, resolve, reject)
            // }
          } catch (error) {
            reject(error)
          }
        }, 0)
      } else if (this.promiseState === 'rejected') {
        setTimeout(() => {
          try {
            if (typeof onRejected !== 'function') {
              resolve(this.promiseResult)
            } else {
              let x = onRejected(this.promiseResult)
              resolvePromise(promise, x, resolve, reject)
            }
          } catch (error) {
            reject(error)
          }
        }, 0)
      } else {
        this.onFulfilledCallbacks.push(() => {
          setTimeout(() => {
            try {
              if (typeof onFulfilled !== 'function') {
                resolve(this.promiseResult)
              } else {
                let x = onFulfilled(this.promiseResult)
                resolvePromise(promise, x, resolve, reject)
              }
            } catch (error) {
              reject(error)
            }
          }, 0)
        })
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              if (typeof onRejected !== 'function') {
                resolve(this.promiseResult)
              } else {
                let x = onRejected(this.promiseResult)
                resolvePromise(promise, x, resolve, reject)
              }
            } catch (error) {
              reject(error)
            }
          }, 0)
        })
      }
    })
    return promise
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  if (x === promise2) {
    throw new TypeError('Chaining cycle detected for promise')
  }

  if (x instanceof myPromise) {
    x.then((y) => {
      resolvePromise(promise2, y, resolve, reject)
    }, reject)
  } else if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
    try {
      var then = x.then
    } catch (e) {
      return reject(e)
    }

    if (typeof then === 'function') {
      let called = false
      try {
        then.call(
          x,
          (y) => {
            if (called) return
            called = true
            resolvePromise(promise2, y, resolve, reject)
          },
          (r) => {
            if (called) return
            called = true
            reject(r)
          }
        )
      } catch (e) {
        if (called) return
        called = true

        reject(e)
      }
    } else {
      resolve(x)
    }
  } else {
    return resolve(x)
  }
}

myPromise.deferred = function () {
  let result = {}
  result.promise = new myPromise((resolve, reject) => {
    result.resolve = resolve
    result.reject = reject
  })
  return result
}

module.exports = myPromise
