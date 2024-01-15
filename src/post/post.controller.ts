import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/decorators';
import { UserInfo } from 'src/auth/decorators/user-info';
import { JwtAuthGuard } from 'src/auth/guards';
import { UserEntity } from 'src/user/entities/user.entity';
import { CreatePostDto, UpdatePostDto } from './dto';
import { PostEntity } from './entities/post.entity';
import { PostService } from './post.service';
import { PostPresenterResponse } from './presenter/post-presenter';

@Controller('post')
@ApiTags('Post')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  async create(
    @Body() createPostDto: CreatePostDto,
    @UserInfo() currentUser: UserEntity,
  ): Promise<PostEntity> {
    const post = await this.postService.create(createPostDto, currentUser);
    return new PostEntity(post);
  }

  @Public()
  @Get()
  findAll(): Promise<PostPresenterResponse[]> {
    return this.postService.findAllPosts();
  }

  @Get('byCurrentUser')
  findCurrentUserPosts(
    @UserInfo() currentUser: UserEntity,
  ): Promise<PostPresenterResponse[]> {
    return this.postService.findAllPostsByUser(currentUser.id);
  }

  @Get('byUser/:userId')
  findAllUserPosts(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<PostPresenterResponse[]> {
    return this.postService.findAllPostsByUser(userId);
  }

  @Get(':id/withAnswers')
  findWithAnswers(@Param('id', ParseIntPipe) id: number) {
    return this.postService.findWithAnswers(id);
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number): Promise<PostEntity> {
    return this.postService.findPostById(id);
  }

  @Patch(':id')
  update(
    @Body() updatePostDto: UpdatePostDto,
    @Param('id', ParseIntPipe) id: number,
    @UserInfo() currentUser: UserEntity,
  ) {
    return this.postService.update(id, updatePostDto, currentUser);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @UserInfo() currentUser: UserEntity,
  ) {
    return this.postService.remove(id, currentUser);
  }
}
