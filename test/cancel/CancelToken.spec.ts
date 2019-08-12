import CancelToken from '../../src/cancel/CancelToken'
import Cancel from '../../src/cancel/Cancel'
import { Canceler } from '../../src/types'

describe('CancelToken', () => {
  describe('reason', () => {
    test('should returns a Cancel if Cancellation hsa been requested', () => {
      let cancel: Canceler
      let token = new CancelToken(c => {
        cancel = c
      })

      cancel!('operation has been canceled')
      expect(token.reason).toEqual(expect.any(Cancel))
      expect(token.reason!.message).toBe('operation has been canceled')
    })

    test('should has no side effect if call cancellation for multi times', () => {
      let cancel: Canceler
      let token = new CancelToken(c => {
        cancel = c
      })

      cancel!('operation has been canceled')
      cancel!('operation has been canceled')
      expect(token.reason).toEqual(expect.any(Cancel))
      expect(token.reason!.message).toBe('operation has been canceled')
    })

    test('should returns undefined if cancellation has not been request', () => {
      const token = new CancelToken(() => {})
      expect(token.reason).toBeUndefined()
    })
  })

  describe('promise', () => {
    test('should returns a Promise that resolve when cancellation is request', done => {
      let cancel: Canceler
      const token = new CancelToken(c => {
        cancel = c
      })
      token.promise.then(value => {
        expect(value).toEqual(expect.any(Cancel))
        expect(value.message).toBe('operation has been canceled')
        done()
      })
      cancel!('operation has been canceled')
    })
  })

  describe('throwIfRequested', () => {
    test('should throws if cancellation has been requested', () => {
      let cancel: Canceler
      const token = new CancelToken(c => {
        cancel = c
      })
      cancel!('operation has been canceled')
      try {
        token.throwIfRequested()
        fail('Expected throwIfRequested to throw')
      } catch (error) {
        if (!(error instanceof Cancel)) {
          fail('Expected throwIfRequested to throw a Cancel, but test threw ' + error)
        }
        expect(error.message).toBe('operation has been canceled')
      }
    })

    test('should does not throw if cancellation has not been requested', () => {
      const token = new CancelToken(() => {})
      token.throwIfRequested()
    })
  })

  describe('source', () => {
    test('should returns an object contatining token and cancel function', () => {
      const source = CancelToken.source()
      expect(source.token).toEqual(expect.any(CancelToken))
      expect(source.cancel).toEqual(expect.any(Function))
      expect(source.token.reason).toBeUndefined()
      source.cancel('operation has been canceled')
      expect(source.token.reason).toEqual(expect.any(Cancel))
      expect(source.token.reason!.message).toBe('operation has been canceled')
    })
  })
})
