import { Injectable } from '@nestjs/common';
import { Post } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserEntity } from 'src/user/entities/user.entity';
import { CreatePostDto, UpdatePostDto } from './dto';
import {
  PostPresenter,
  PostPresenterResponse,
} from './presenter/post-presenter';
import { PostWithCommentsPresenter } from './presenter/post-with-comments-presenter';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createPostDto: CreatePostDto,
    currentUser: UserEntity,
  ): Promise<Post> {
    const { tagIds, content, title } = createPostDto;

    const createdPost = await this.prisma.post.create({
      data: {
        content,
        title,
        authorId: currentUser.id,
      },
    });

    await this.prisma.postTag.createMany({
      data: tagIds.map((tag) => ({ postId: createdPost.id, tagId: tag })),
    });

    return createdPost;
  }

  async findAllPosts(): Promise<PostPresenterResponse[]> {
    const posts = await this.prisma.post.findMany({
      include: {
        likes: true,
        postTags: {
          include: {
            tag: true,
          },
        },
      },
    });

    return posts.map(PostPresenter.toHTTP);
  }

  async filteredByTitleOrContent(
    search: string,
  ): Promise<PostPresenterResponse[]> {
    const posts = await this.prisma.post.findMany({
      where: {
        OR: [
          {
            content: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            title: {
              contains: search,
              mode: 'insensitive',
            },
          },
        ],
      },
      include: {
        likes: true,
        postTags: {
          include: {
            tag: true,
          },
        },
      },
    });

    return posts.map(PostPresenter.toHTTP);
  }

  async filteredByTag(search: string[]): Promise<PostPresenterResponse[]> {
    const posts = await this.prisma.post.findMany({
      where: {
        postTags: {
          some: {
            tag: {
              name: {
                in: search,
                mode: 'insensitive',
              },
            },
          },
        },
      },
      include: {
        likes: true,
        postTags: {
          include: {
            tag: true,
          },
        },
      },
    });

    return posts.map(PostPresenter.toHTTP);
  }

  async findPostById(id: number, currentUser: UserEntity) {
    const post = await this.prisma.post.findUniqueOrThrow({
      where: { id },
      include: {
        likes: true,
        postTags: {
          include: {
            tag: true,
          },
        },
      },
    });

    return PostPresenter.toHTTP(post, currentUser.id);
  }

  async findWithComments(id: number) {
    const post = await this.prisma.post.findUniqueOrThrow({
      where: { id },
      include: {
        comments: true,
        likes: true,
        postTags: {
          include: {
            tag: true,
          },
        },
      },
    });

    return PostWithCommentsPresenter.toHTTP(post);
  }

  async findAllPostsByUser(userId: number) {
    const posts = await this.prisma.post.findMany({
      where: { authorId: userId },
      include: {
        likes: true,
        postTags: {
          include: {
            tag: true,
          },
        },
      },
    });

    return posts.map(PostPresenter.toHTTP);
  }

  async update(
    id: number,
    updatePostDto: UpdatePostDto,
    currentUser: UserEntity,
  ): Promise<Post> {
    await this.getUserId(id, currentUser);
    return this.prisma.post.update({
      where: { id },
      data: updatePostDto,
    });
  }

  async remove(id: number, currentUser: UserEntity) {
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
