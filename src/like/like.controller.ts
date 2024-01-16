import {
  Controller,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserInfo } from 'src/auth/decorators';
import { JwtAuthGuard } from 'src/auth/guards';
import { UserEntity } from 'src/user/entities/user.entity';
import { LikeService } from './like.service';

@Controller('like')
@ApiTags('Like')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post(':postId')
  create(
    @UserInfo() currentUser: UserEntity,
    @Param('postId', ParseIntPipe) postId: number,
  ) {
    return this.likeService.create(postId, currentUser);
  }
}
