'use strict'

const { checkEmpty, projection } = require('../generators/utils')

describe('Utils', () => {
  it('checkEmpty with empty value should return a exception message', () => {
    const EXCEPTION_MSG = 'Empty value is not allowed!'
    expect(checkEmpty()).toBe(EXCEPTION_MSG)
    expect(checkEmpty('')).toBe(EXCEPTION_MSG)
    expect(checkEmpty(null)).toBe(EXCEPTION_MSG)
    expect(checkEmpty(undefined)).toBe(EXCEPTION_MSG)
  })

  it('checkEmpty with some value should return true', () => {
    expect(checkEmpty('some value')).toBe(true)
  })

  it('projection should map an object structure', () => {
    const addOne = {
      a: (o) => o.x + 1,
      b: (o) => o.y + 1
    }
    const target = {x: 1, y: 1}
    expect(projection(addOne, target)).toEqual({a: 2, b: 2})
  })
})
