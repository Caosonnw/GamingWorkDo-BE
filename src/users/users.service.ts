import { parseStringToNumber } from '@/utils/helper'
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
        return Response('Get all users successfully!', HttpStatus.OK, result)
      } else {
        return Response('No user found!', HttpStatus.NOT_FOUND)
      }
    } catch (error) {
      return Response('An error occurred during the process', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getUserById(user_id) {
    try {
      const user = await this.prisma.users.findUnique({
        where: { user_id: parseStringToNumber(user_id) }
      })
      if (user) {
        const result = {
          user_id: user.user_id,
          full_name: user.full_name,
          email: user.email,
          phone_number: user.phone_number,
          date_of_birth: user.date_of_birth,
          role: user.role
        }
        return Response('Get user by id successfully!', HttpStatus.OK, result)
      } else {
        return Response('User not found!', HttpStatus.NOT_FOUND)
      }
    } catch (error) {
      return Response('An error occurred during the process', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
