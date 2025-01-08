import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler())
    if (!roles) {
      return true // Nếu không yêu cầu role nào, cho phép truy cập
    }

    const request = context.switchToHttp().getRequest()
    const user = request.user

    console.log('Request User in RolesGuard:', user)

    if (!user) {
      throw new ForbiddenException('User not authenticated')
    }

    return roles.some((role) => user?.role === role)
  }
}
// const hasRole = requiredRoles.some((role) => user.role === role)
//     console.log('Has Role:', hasRole)

//     if (!hasRole) {
//       throw new ForbiddenException('Access Denied: Insufficient permissions')
//     }

//     return hasRole // Cho phép truy cập nếu có ít nhất một role hợp lệ
