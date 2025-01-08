import { HttpStatus } from '@nestjs/common'

export interface ApiResponse<T> {
  data: T | null
  message: string
  statusCode: HttpStatus
  date: Date
}

export const Response = <T>(data: T | null, message: string, statusCode: HttpStatus): ApiResponse<T> => {
  return {
    data,
    message,
    statusCode,
    date: new Date()
  }
}

export const ErrorResponse = (message: string, statusCode: HttpStatus): ApiResponse<null> => {
  return {
    data: null,
    message,
    statusCode,
    date: new Date()
  }
}
