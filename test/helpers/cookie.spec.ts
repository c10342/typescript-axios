import cookie from '../../src/helpers/cookie'

describe('cookie', () => {
  test('shuold read cookies', () => {
    document.cookie = 'foo=baz'
    expect(cookie.read('foo')).toBe('baz')
  })

  test('should return null if cookie name is not exist', () => {
    document.cookie = 'foo=bar'
    expect(cookie.read('bar')).toBeNull()
  })
})
