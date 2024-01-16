import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { UserInfo } from 'src/auth/decorators/user-info';
import { UserEntity } from 'src/user/entities/user.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards';

@Controller('comment')
@ApiTags('Comment')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post(':postId/post')
  commentOnPost(
    @UserInfo() currentUser: UserEntity,
    @Param('postId', ParseIntPipe) postId: number,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.commentService.commentOnPost(
      currentUser,
      postId,
      createCommentDto,
    );
  }

  @Post(':commentId/comment')
  commentOnComment(
    @UserInfo() currentUser: UserEntity,
    @Param('commentId', ParseIntPipe) commentId: number,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.commentService.commentOnComment(
      currentUser,
      commentId,
      createCommentDto,
    );
  }

  @Get(':postId/withChildComments')
  findAllWithChildComments(@Param('postId', ParseIntPipe) postId: number) {
    return this.commentService.findAllByPostWithChildComments(postId);
  }

  @Get(':postId')
  findAll(@Param('postId', ParseIntPipe) postId: number) {
    return this.commentService.findAllByPost(postId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.commentService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCommentDto: UpdateCommentDto,
    @UserInfo() currentUser: UserEntity,
  ) {
    return this.commentService.update(id, updateCommentDto, currentUser);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @UserInfo() currentUser: UserEntity,
  ) {
    return this.commentService.remove(id, currentUser);
  }
}
