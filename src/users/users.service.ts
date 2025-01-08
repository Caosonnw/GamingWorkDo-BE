import { Response } from '@/utils/utils'
import { HttpStatus, Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaClient) {}

  async getAllUsers() {
    try {
      const users = await this.prisma.users.findMany()
      if (users && users.length > 0) {
        const result = users.map((user) => ({
          user_id: user.user_id,
          full_name: user.full_name,
          email: user.email,
          phone_number: user.phone_number,
          date_of_birth: user.date_of_birth,
          role: user.role
        }))
        return Response(result, 'Get all users successfully!', HttpStatus.OK)
      }
    } catch (error) {
      return Response(null, 'An error occurred during the process', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
