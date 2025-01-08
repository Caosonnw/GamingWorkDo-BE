import { ApiResponse } from '@/utils/utils'
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp()
    const response = ctx.getResponse()
    return next.handle().pipe(
      map((data: ApiResponse<T>) => {
        response.status(data.statusCode) // Đồng bộ HTTP status code
        return data
      })
    )
  }
}
