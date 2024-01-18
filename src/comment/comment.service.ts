import { Injectable } from '@nestjs/common';
import { Comment } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserEntity } from 'src/user/entities/user.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) {}

  async commentOnPost(
    currentUser: UserEntity,
    postId: number,
    createCommentDto: CreateCommentDto,
  ): Promise<Comment> {
    const createComment = await this.prisma.comment.create({
      data: {
        ...createCommentDto,
        postId,
        authorId: currentUser.id,
      },
    });
    return createComment;
  }

  async commentOnComment(
    currentUser: UserEntity,
    commentId: number,
    createCommentDto: CreateCommentDto,
  ): Promise<Comment> {
    const createComment = await this.prisma.comment.create({
      data: {
        ...createCommentDto,
        parentCommentId: commentId,
        authorId: currentUser.id,
      },
    });
    return createComment;
  }

  findAllByPost(postId: number) {
    return this.prisma.comment.findMany({
      where: {
        postId,
      },
    });
  }

  findAllByPostWithChildComments(postId: number) {
    return this.prisma.comment.findMany({
      where: {
        postId,
      },
      include: {
        comments: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.post.findUniqueOrThrow({ where: { id } });
  }

  async update(
    id: number,
    updateCommentDto: UpdateCommentDto,
    currentUser: UserEntity,
  ): Promise<Comment> {
    await this.getUserId(id, currentUser);
    return this.prisma.comment.update({
      where: { id },
      data: updateCommentDto,
    });
  }

  async remove(id: number, currentUser: UserEntity) {
    await this.getUserId(id, currentUser);
    return this.prisma.comment.delete({ where: { id } });
  }

  async getUserId(id: number, currentUser: UserEntity) {
    const comment = await this.prisma.comment.findUniqueOrThrow({
      where: { id },
    });
    if (comment.authorId != currentUser.id) {
      throw new Error('You cannot delete/edit post of another user');
    }
  }
}
