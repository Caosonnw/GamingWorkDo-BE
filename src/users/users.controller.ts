import { JwtAuthGuard } from '@/auth/guards/ jwt-auth.guard'
import { Roles } from '@/auth/guards/decorators/roles.decorator'
import { RolesGuard } from '@/auth/guards/roles/roles.guard'
import { UserRole } from '@/auth/guards/roles/user.roles'
import { Body, Controller, Get, HttpStatus, Param, Patch, Req, UseGuards, UseInterceptors } from '@nestjs/common'
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger'
import { UsersService } from './users.service'
import { ResponseInterceptor } from '@/common/interceptors/response.interceptor'
import { Response } from '@/utils/utils'

@ApiTags('Users')
@UseInterceptors(ResponseInterceptor)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('me')
  async getMe(@Req() req) {
    const userId = req.user.user_id
    if (userId) {
      const userResponse = await this.usersService.getUserById(userId)
      return Response('Get me successfully!', HttpStatus.OK, userResponse.data)
    } else {
      return Response('No user found!', HttpStatus.NOT_FOUND)
    }
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.Owner)
  @Get('get-all-users')
  getAllUsers() {
    return this.usersService.getAllUsers()
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('get-user-by-id/:user_id')
  @ApiParam({ name: 'user_id', description: 'User ID' })
  getUserById(@Param('user_id') user_id) {
    return this.usersService.getUserById(user_id)
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.Owner, UserRole.USER)
  @Get('test-me')
  getMeTest(@Req() req) {
    if (req.user) {
      return Response('Get me successfully!', HttpStatus.OK, req.user)
    } else {
      return Response('No user found!', HttpStatus.NOT_FOUND)
    }
  }
}
