import { Response } from '@/utils/utils'
import { Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class FriendsService {
  constructor(private prisma: PrismaClient) {}

  async addFriend(userId) {
    const user_id = parseInt(userId)
    try {
      // Bước 1: Tìm tất cả user có role là OWNER hoặc ADMIN (trừ chính mình)
      const targetUsers = await this.prisma.users.findMany({
        where: {
          role: {
            in: ['OWNER', 'ADMIN']
          },
          NOT: {
            user_id: user_id
          }
        }
      })

      if (targetUsers.length === 0) {
        return {
          message: 'No eligible users (OWNER or ADMIN) found to add as friends',
          status: 404,
          date: new Date()
        }
      }

      const results = []

      // Bước 2: Lặp qua từng người và tạo kết bạn nếu chưa tồn tại
      for (const target of targetUsers) {
        const existingFriend = await this.prisma.user_friends.findFirst({
          where: {
            user_id,
            friend_id: target.user_id
          }
        })

        if (!existingFriend) {
          const newFriend = await this.prisma.user_friends.create({
            data: {
              user_id,
              friend_id: target.user_id
            }
          })

          results.push({
            friendId: target.user_id,
            status: 'added'
          })
        } else {
          results.push({
            friendId: target.user_id,
            status: 'already friends'
          })
        }
      }

      return Response('Add friend successfully', 200)
    } catch (error) {
      console.error(error)
      throw new Error('An error occurred while processing your request')
    }
  }

  async getFriendsByUserId(user_id: number) {
    try {
      const data = await this.prisma.user_friends.findMany({
        where: {
          friend_id: parseInt(String(user_id))
        },
        include: {
          users_user_friends_friend_idTousers: true
        }
      })
      return {
        data,
        message: 'Get friends by userId successfully',
        status: 200,
        date: new Date()
      }
    } catch (error) {
      console.log(error)
      throw new Error('An error occurred while processing your request')
    }
  }
}
