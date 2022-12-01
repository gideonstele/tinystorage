export const info = (message?: any, ...optionalParams: any[]) => {
  if (typeof console !== 'undefined') {
    console.info(message, ...optionalParams)
  }
}

export const warn = (message?: any, ...optionalParams: any[]) => {
  if (typeof console !== 'undefined') {
    console.warn(message, ...optionalParams)
  }
}

export const log = (message?: any, ...optionalParams: any[]) => {
  if (typeof console !== 'undefined') {
    console.log(message, ...optionalParams)
  }
}

export const error = (message?: any, ...optionalParams: any[]) => {
  if (typeof console !== 'undefined') {
    console.error(message, ...optionalParams)
  }
}
