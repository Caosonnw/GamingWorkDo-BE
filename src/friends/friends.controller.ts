import { Controller, Get, Param, Post } from '@nestjs/common'
import { FriendsService } from './friends.service'

@Controller('friends')
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  @Post('add-friend/:userId')
  addFriend(@Param('userId') userId: number) {
    return this.friendsService.addFriend(userId)
  }

  @Get('get-friends-by-userId/:user_id')
  getFriendsByUserId(@Param('user_id') user_id: number) {
    return this.friendsService.getFriendsByUserId(user_id)
  }
}
