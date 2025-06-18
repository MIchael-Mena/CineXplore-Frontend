import type { AxiosHeaders } from 'axios'
import type { z } from 'zod'
// import { ApiError } from './errorHandler'
// import { UseMutateAsyncFunction } from '@tanstack/react-query'

type BaseApi<ResponseType, ParsedResponseType> = {
  // La key se utiliza para almacenar en caché la respuesta e invalidarla cuando se llama a la mutation. Si la clave es la misma que una query, la query tambien se invalidara.
  key: string[]
  method: string
  authenticated: boolean
  endpoint: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: any
  headers?: AxiosHeaders
  validateResponse: z.ZodType<ResponseType>
  parseResponse: (response: ResponseType) => ParsedResponseType
}

// Query type extends BaseApi
export type Query<ResponseType, ParsedResponseType = ResponseType> = {
  method: 'GET'
  key: string[]
  authenticated: boolean
  endpoint: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: any
  headers?: AxiosHeaders
  validateResponse: z.ZodType<ResponseType>
  parseResponse: (response: ResponseType) => ParsedResponseType
}

// Mutation type extends BaseApi
export type Mutation<
  ResponseType,
  ParsedResponseType = ResponseType,
  BodyType = undefined,
  ParsedBodyType = BodyType,
> = BaseApi<ResponseType, ParsedResponseType> & {
  method: 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  bodyType?: 'json' | 'form-data'
  responseType?: 'json' | 'file'
  parseBody?: (body: BodyType) => ParsedBodyType
  onSuccess?: (data: ParsedResponseType, variables: BodyType, context: unknown) => Promise<unknown> | unknown
}

// export type MutateAsyncFunction = UseMutateAsyncFunction<LogView, ApiError, LogDataDTO, unknown>

// export type DeleteAsyncFunction = UseMutateAsyncFunction<void, ApiError, { reportId: string }>

export type ApiResponse<DataType> = {
  data: DataType
  status: string
}
