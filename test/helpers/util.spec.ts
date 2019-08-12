import {
  isDate,
  isPlainObject,
  isFormData,
  isUrlSearchParams,
  isObject,
  isAbsoluteURL,
  extend,
  deepMerge,
  combineURL,
  isUrlSameOrign
} from '../../src/helpers/util'

describe('helper:util', () => {
  describe('isXX', () => {
    test('should validate Date', () => {
      expect(isDate(new Date())).toBeTruthy()
      expect(isDate(Date.now())).toBeFalsy()
    })

    test('should validate PlainObject', () => {
      expect(isPlainObject({})).toBeTruthy()
      expect(isPlainObject({ name: '张三', age: 13 })).toBeTruthy()
      expect(isPlainObject(Object.create(null))).toBeTruthy()
      expect(isPlainObject(new Date())).toBeFalsy()
    })

    test('should validate FormDate', () => {
      expect(isFormData(new FormData())).toBeTruthy()
      expect(isFormData({})).toBeFalsy()
    })

    test('should validate URLSearchParams', () => {
      expect(isUrlSearchParams(new URLSearchParams())).toBeTruthy()
      expect(isUrlSearchParams('foo=123&b=2')).toBeFalsy()
    })

    test('should validate Object', () => {
      expect(isObject(null)).toBeFalsy()
      expect(isObject(new Date())).toBeTruthy()
      expect(isObject({})).toBeTruthy()
      expect(isObject(undefined)).toBeFalsy()
    })

    test('should validate AbsoluteURL', () => {
      expect(isAbsoluteURL('/foo?a=1&b=2')).toBeFalsy()
      expect(isAbsoluteURL('http://localhost:8080')).toBeTruthy()
    })
  })

  describe('extend', () => {
    test('should be mutable', () => {
      const a = Object.create(null)
      const b = { foo: 123 }

      extend(a, b)

      expect(a.foo).toBe(123)
    })

    test('should be properties', () => {
      const a = { foo: 123, bar: 456 }
      const b = { bar: 789 }
      const c = extend(a, b)

      expect(c.foo).toBe(123)
      expect(c.bar).toBe(789)
    })
  })

  describe('deepMerge', () => {
    test('should be immutable', () => {
      const a = Object.create(null)
      const b: any = { foo: 123 }
      const c: any = { bar: 456 }

      deepMerge(a, b, c)

      expect(typeof a.foo).toBe('undefined')
      expect(typeof a.bar).toBe('undefined')
      expect(typeof b.bar).toBe('undefined')
      expect(typeof c.foo).toBe('undefined')
    })

    test('should deepMerge properties', () => {
      const a = { foo: 123 }
      const b = { bar: 456 }
      const c = { foo: 789 }
      const d = deepMerge(a, b, c)

      expect(d.foo).toBe(789)
      expect(d.bar).toBe(456)
    })

    test('should deepMerge recursively', () => {
      const a = { foo: { bar: 123 } }
      const b = { foo: { baz: 456 }, bar: { qux: 789 } }
      const c = deepMerge(a, b)

      expect(c).toEqual({
        foo: {
          bar: 123,
          baz: 456
        },
        bar: {
          qux: 789
        }
      })
    })

    test('should remove all references from nested objects', () => {
      const a = { foo: { bar: 123 } }
      const b = {}
      const c = deepMerge(a, b)

      expect(c).toEqual({
        foo: { bar: 123 }
      })

      expect(c.foo).not.toBe(a.foo)
    })

    test('should handle null and undefined arguments', () => {
      expect(deepMerge(undefined, undefined)).toEqual({})
      expect(deepMerge(undefined, { foo: 123 })).toEqual({ foo: 123 })
      expect(deepMerge({ foo: 123 }, undefined)).toEqual({ foo: 123 })

      expect(deepMerge(null, null)).toEqual({})
      expect(deepMerge(null, { foo: 123 })).toEqual({ foo: 123 })
      expect(deepMerge({ foo: 123 }, null)).toEqual({ foo: 123 })
    })
  })

  describe('combineURL', () => {
    test('should combine URL', () => {
      expect(combineURL('https://api.github.com', '/api/a?a=1&b=2')).toBe(
        'https://api.github.com/api/a?a=1&b=2'
      )
    })

    test('should remove duplicate slashes', () => {
      expect(combineURL('https://api.github.com/', '/api/a?a=1&b=2')).toBe(
        'https://api.github.com/api/a?a=1&b=2'
      )
    })

    test('should insert missing slash', () => {
      expect(combineURL('https://api.github.com', 'api')).toBe('https://api.github.com/api')
    })

    test('should bot insert slash when relative url missing/empty', () => {
      expect(combineURL('https://api.github.com/api', '')).toBe('https://api.github.com/api')
    })

    test('should allow a single slash for relative url', () => {
      expect(combineURL('https://api.github.com/api', '/')).toBe('https://api.github.com/api/')
    })
  })

  describe('isUrlSameOrign', () => {
    test('should detect same orign', () => {
      expect(isUrlSameOrign(window.location.href)).toBeTruthy()
    })

    test('should detect different origin', () => {
      expect(isUrlSameOrign('http://github.com/c10342')).toBeFalsy()
    })
  })
})
