import { CancelExecutor, Canceler, CancelTokenSource } from '../types'
import Cancel from './Cancel'

interface ResolvePromise {
  (reason?: Cancel): void
}

// 取消请求管理类
export default class CancelToken {
  promise: Promise<Cancel>

  reason?: Cancel

  constructor(executor: CancelExecutor) {
    let resolvePromise: ResolvePromise
    this.promise = new Promise<Cancel>(resolve => {
      resolvePromise = resolve
    })

    executor(message => {
      if (this.reason) {
        return
      }
      this.reason = new Cancel(message)

      /**
       *
       * Promise有pedding变resolve状态,从而触发了../core/xhr.ts中的     *  canceltoken.promise.then(reason=>{
       *  request.abort() // 取消请求
       *   reject(reason)
       *   })
       */
      resolvePromise(this.reason)
    })
  }

  // 判断是否已经取消过请求，已经取消过在此发送请求时没有意义的
  throwIfRequested(): void {
    if (this.reason) {
      throw this.reason
    }
  }
  static source(): CancelTokenSource {
    let cancel!: Canceler
    const token = new CancelToken(c => {
      cancel = c
    })
    return {
      cancel,
      token
    }
  }
}
