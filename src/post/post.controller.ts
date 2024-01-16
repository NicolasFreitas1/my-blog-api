import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
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

  @Get('filterByTitleOrContent')
  async filteredByTitleOrContent(
    @Query('search') search: string,
  ): Promise<PostPresenterResponse[]> {
    return await this.postService.filteredByTitleOrContent(search);
  }

  @Get('filterByTags')
  async filteredByTagPosts(
    @Query('search') search: string,
  ): Promise<PostPresenterResponse[]> {
    return await this.postService.filteredByTag(search);
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

  @Get(':id/withComments')
  findWithAnswers(@Param('id', ParseIntPipe) id: number) {
    return this.postService.findWithComments(id);
  }

  @Get(':id')
  findById(
    @UserInfo() currentUser: UserEntity,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.postService.findPostById(id, currentUser);
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
