'use strict'

const { curry, map } = require('ramda')

const projection = curry(function (descriptor, data) {
  return map((fn) => fn(data), descriptor)
})

const checkEmpty = (value) => {
  if (!value) return `Empty value is not allowed!`
  return true
}

module.exports = {
  checkEmpty,
  projection
}
