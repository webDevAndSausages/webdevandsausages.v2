import { is } from 'ramda'

const API_ROOT = 'https://us-central1-wds-event-tool.cloudfunctions.net/api'

export const toParam = item =>
  item ? encodeURIComponent(decodeURIComponent(item)) : ''

export const makeQueryParam = params =>
  Object.keys(params)
    .filter(k => params[k])
    .map(
      k =>
        is(Array, params[k])
          ? params[k].reduce(
              (acc, val, index) =>
                index === params[k].length - 1
                  ? `${acc}${toParam(k)}=${toParam(val)}`
                  : `${acc}${toParam(k)}=${toParam(val)}&`,
              ''
            )
          : `${toParam(k)}=${toParam(params[k])}`
    )
    .join('&')

export const endpoints = {
  auth: () => `${API_ROOT}/auth`,
  getPass: (name, params) =>
    `${API_ROOT}/temppass/${name}${params ? makeQueryParams(params) : ''}`
}
