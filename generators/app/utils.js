'use strict'

const { curry, map } = require('ramda')

const projection = curry(function (descriptor, data) {
  return map((fn) => fn(data), descriptor)
})

const merge = curry(function (target, source) {
  return Object.assign(target, source)
})

const checkEmpty = (value) => {
  if (!value) return `Empty value is not allowed!`
  return true
}

module.exports = {
  projection,
  merge,
  checkEmpty
}
