import { Injectable } from '@nestjs/common';
import { Post } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserEntity } from 'src/user/entities/user.entity';
import { CreatePostDto, UpdatePostDto } from './dto';
import {
  PostPresenter,
  PostPresenterResponse,
} from './presenter/post-presenter';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPostDto: CreatePostDto, currentUser): Promise<Post> {
    const createdPost = await this.prisma.post.create({
      data: {
        ...createPostDto,
        authorId: currentUser.id,
      },
    });
    return createdPost;
  }

  async findAllPosts(): Promise<PostPresenterResponse[]> {
    const posts = await this.prisma.post.findMany();

    return posts.map(PostPresenter.toHTTP);
  }

  findPostById(id: number) {
    return this.prisma.post.findUniqueOrThrow({ where: { id } });
  }

  findWithAnswers(id: number) {
    return this.prisma.post.findUniqueOrThrow({
      where: { id },
      include: {
        answers: true,
      },
    });
  }

  async findAllPostsByUser(userId: number) {
    const posts = await this.prisma.post.findMany({
      where: { authorId: userId },
    });

    return posts.map(PostPresenter.toHTTP);
  }

  async update(
    id: number,
    updatePostDto: UpdatePostDto,
    currentUser,
  ): Promise<Post> {
    await this.getUserId(id, currentUser);
    return this.prisma.post.update({
      where: { id },
      data: updatePostDto,
    });
  }

  async remove(id: number, currentUser) {
    await this.getUserId(id, currentUser);
    return this.prisma.post.delete({ where: { id } });
  }

  async getUserId(id: number, currentUser: UserEntity) {
    const post = await this.prisma.post.findUniqueOrThrow({ where: { id } });
    if (post.authorId != currentUser.id) {
      throw new Error('You cannot delete/edit post of another user');
    }
  }
}
