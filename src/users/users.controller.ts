import { JwtAuthGuard } from '@/auth/guards/ jwt-auth.guard'
import { Roles } from '@/auth/guards/decorators/roles.decorator'
import { RolesGuard } from '@/auth/guards/roles/roles.guard'
import { UserRole } from '@/auth/guards/roles/user.roles'
import { Controller, Get, Req, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { UsersService } from './users.service'

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('get-all-users')
  getAllUsers() {
    return this.usersService.getAllUsers()
  }

  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.Owner, UserRole.USER)
  @Get('me')
  getMe(@Req() req) {
    console.log('Request User in Controller:', req.user)
    return req.user
  }
}
