'use strict'

module.exports = {
  checkEmpty
}

function checkEmpty (value) {
  if (!value) return `Empty value is not allowed!`
  return true
}
