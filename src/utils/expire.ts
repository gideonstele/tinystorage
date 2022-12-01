const expReg = /^(?:@exp=([0-9]+);\s)(.+)$/g

interface DataWithExpire {
  data: string
  hasExpired: boolean
  expireAt?: number
}

export const getWithExpire = (value: string): DataWithExpire => {
  const match = expReg.exec(value)

  if (!match) {
    return {
      hasExpired: false,
      data: value,
    }
  }

  const [, expireTimestamp, data] = match

  const expireAt = Number(expireTimestamp)
  const now = new Date()

  return {
    hasExpired: now.getTime() > expireAt,
    data,
  }
}

export const setWithExpire = (value: string, expireAfter?: number): string => {
  if (!expireAfter) {
    return value
  }

  return `@exp=${new Date().getTime() + expireAfter}; ${value}`
}
