import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LikeService {
  constructor(private prisma: PrismaService) {}

  async create(postId: number, currentUser: User) {
    await this.prisma.post.findUniqueOrThrow({
      where: { id: postId },
    });

    const like = await this.prisma.like.findFirst({
      where: {
        postId,
        userId: currentUser.id,
      },
    });

    if (like) {
      return this.prisma.like.delete({
        where: { id: like.id },
      });
    }

    return this.prisma.like.create({
      data: {
        postId,
        userId: currentUser.id,
      },
    });
  }

  remove(id: number) {
    return this.prisma.like.delete({
      where: { id },
    });
  }
}
