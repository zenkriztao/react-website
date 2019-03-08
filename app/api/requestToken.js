// HTTP Request file
import axios from 'axios'
import { BASE_URL } from '../utils/constants'

const httpConfig = {
  baseURL: BASE_URL,
  headers: {},
  responseType: 'json',
}

const RequestToken = axios.create(httpConfig)

/* eslint-disable no-underscore-dangle */

function InterceptorsRequest(config) {
  config.headers['Content-Type'] = 'application/json'
  config.headers['Authorization'] = 'Basic c2stZGV2LXVpLTY5NDQzNS01MzQzNDcyMzA5OnNrLWRldi11aS02OTQ0MzUtMjcxMTIwMTgtMTc4NDY0ODktNTM0MzQ3MjMwOQ=='
  console.log('API_REQUEST:', config)
  return config
}


const _handleCommonError = (errorResponse) => {
  // TODO: Handle Error
  if (errorResponse.message) {
  }
}

const _interceptorsResponseError = (error) => {
  switch (error.status) {
    case 401:
      // will redirect to "login" when Unauthorised error will raise
      break
    default:
      _handleCommonError(error)
      break
  }
}

// Add a request interceptor
RequestToken.interceptors.request.use(
  (config) => {
    return InterceptorsRequest(config)
  },
  (error) => {
    console.log('API_REQUEST_ERROR:', error)
    return Promise.reject(error.response)
  },
)

// Add a response interceptor
RequestToken.interceptors.response.use(
  (response) => {
    console.log('API_RESPONSE:', response)
    return response
  },
  (error) => {
    console.log('API_RESPONSE_ERROR', error.response)
    _interceptorsResponseError(error.response)
    return Promise.reject(error.response)
  },
)

export default RequestToken
