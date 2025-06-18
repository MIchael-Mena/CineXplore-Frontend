import type { AxiosError } from 'axios'
import { isAxiosError } from 'axios'

export class ApiError extends Error {
  code: number

  constructor(code: number, message: string) {
    super(message)
    this.code = code
    this.name = 'ApiError'
  }
}

interface CustomAxiosError {
  statusCode: number
  message: string
  error: string
}

export const apiErrorHandler = (e: Error) => {
  if (isAxiosError(e)) {
    const error = e as AxiosError<CustomAxiosError>
    if (error.response) {
      if (!error.response.data) {
        throw new ApiError(-1, 'An unknown error occurred on the server.')
      }
      if (error.response.status === 500) {
        throw new ApiError(-1, 'An unknown error occurred on the server.')
      }
      throw new ApiError(error.response?.status, error.response?.statusText)
    } else if (error.request) {
      throw new ApiError(-1, 'No response from the server.')
    } else {
      throw new ApiError(-1, 'An unknown error occurred on the server.')
    }
  }
  throw new ApiError(-1, 'Unknown error.')
}
