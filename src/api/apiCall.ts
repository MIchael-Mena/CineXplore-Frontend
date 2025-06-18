import type { AxiosRequestConfig } from 'axios'
import type { z } from 'zod'
import axios from 'axios'
import env from '@environment/loader'
import { apiErrorHandler } from './errorHandler'
import { Mutation, Query } from './types'

interface AuthData {
  username: string
  password: string
}

const caller = axios.create({
  baseURL: env.apiUrl,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Accept-Language': 'es',
  },
})
caller.interceptors.response.use(response => response, apiErrorHandler)

export const resourceUrl = (id: string) => `${env.apiUrl}/resources/${id}`

export const queryCall = async <T, R>(query: Query<T, R>, token: string): Promise<R> => {
  const response = await caller.request<T>({
    url: query.endpoint,
    method: query.method,
    params: query.params,
    headers:
      query.authenticated && token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {},
  })

  validateResponse(response.data, query.validateResponse)

  return query.parseResponse(response.data)
}

export const mutationCall = async <T, R, V, K = T>(
  mutation: Mutation<V, R, T, K>,
  data: T,
  token: string,
): Promise<R> => {
  let authorization: string = ''

  if (mutation.authenticated && token) {
    authorization = `Bearer ${token}`
  } else if (mutation.endpoint === '/auth') {
    authorization = `Basic ${btoa(`${(data as AuthData).username}:${(data as AuthData).password}`)}`
  }

  const config: AxiosRequestConfig = {
    url: mutation.endpoint,
    method: mutation.method,
    params: mutation.params,
    data: mutation.bodyType === 'form-data' ? data : mutation.parseBody ? mutation.parseBody(data) : data,
    headers: {
      'Content-Type': mutation.bodyType === 'form-data' ? 'multipart/form-data' : 'application/json',
      Authorization: authorization,
      ...mutation.headers,
    },
  }

  if (mutation.responseType === 'file') {
    const response = await caller.request<V>({
      ...config,
      responseType: 'blob',
    })

    validateResponse(response.data, mutation.validateResponse)
    return mutation.parseResponse(response.data)
  }

  const response = await caller.request<V>(config)

  return mutation.parseResponse(response.data)
}

const validateResponse = <T>(response: T, schema: z.ZodType) => {
  const validation = schema.safeParse(response)

  if (!validation.success) {
    const errorMessages = validation.error.issues
      .map(issue => `Field: ${issue.path.join('.')}, Error: ${issue.message}`)
      .join(';\n ')

    throw new Error(`API response validation failed in the following fields: ${errorMessages}`)
  }
}
