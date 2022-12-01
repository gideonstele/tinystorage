import { error } from './console'

const stringReg = /^"(.*)"$/
const arrayReg = /^\[(.*)\]$/
const objectReg = /^\{(.*)\}$/
const numberReg = /^-?\d+(\.\d+)?$/

const stringify = (obj: object | any[] | string) => {
  try {
    return JSON.stringify(obj)
  } catch (e) {
    error(e)
    return ''
  }
}

const parse = (str: string) => {
  try {
    return JSON.parse(str)
  } catch (e) {
    error(e)
    return null
  }
}

export const defaultSerialize = (input: any): string => {
  if (typeof input === 'string') {
    return stringify(`"${input}"`)
  } else if (Array.isArray(input)) {
    return stringify(input)
  } else if (typeof input === 'object') {
    if ('toJSON' in input) {
      return input.toJSON()
    } else {
      return stringify(input)
    }
  }

  return String(input)
}

export const defaultDeserialize = (input: string): any => {
  const matchString = input.match(stringReg)

  if (matchString && matchString[1]) {
    return matchString[1]
  } else if (input.match(arrayReg) || input.match(objectReg)) {
    return parse(input)
  } else if (input.match(numberReg)) {
    return Number(input)
  }

  return input
}
