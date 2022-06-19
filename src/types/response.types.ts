export type {ListResponse, ErrorResponse}

interface ListResponse<T> {
  contents: T[]
  totalCount: number
}

interface ErrorResponse {
  errorCode: string
  errorMessage: string
  statusCode: number
  detail?: {}
}
