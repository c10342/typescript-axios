export default class Cancel {
  message?: string

  constructor(message?: string) {
    this.message = message
  }
}

// 判断请求是否已经取消了
export function isCancel(value: any): boolean {
  return value instanceof Cancel
}
