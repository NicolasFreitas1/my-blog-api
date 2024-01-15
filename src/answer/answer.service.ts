import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { PrismaService } from '../prisma/prisma.service';
import { throwError } from 'rxjs';

@Injectable()
export class AnswerService {
  constructor(private prisma: PrismaService) {}

  create(userId: number, postId: number, createAnswerDto: CreateAnswerDto) {
    return this.prisma.answer.create({
      data: {
        authorId: userId,
        postId: postId,
        ...createAnswerDto,
      },
    });
  }

  findAll(postId: number) {
    return this.prisma.answer.findMany({
      where: {
        postId,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.answer.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }

  async update(
    id: number,
    currentUserId: number,
    updateAnswerDto: UpdateAnswerDto,
  ) {
    const answer = await this.findOne(id);

    if (!answer) {
      throw new NotFoundException('Answer not found');
    }

    if (answer.authorId !== currentUserId) {
      throw new ForbiddenException('You only can edit ours answer');
    }

    return this.prisma.answer.update({
      where: {
        id,
      },
      data: {
        ...updateAnswerDto,
      },
    });
  }

  async remove(id: number, currentUserId: number) {
    const answer = await this.findOne(id);

    if (!answer) {
      throw new NotFoundException('Answer not found');
    }

    if (answer.authorId !== currentUserId) {
      throw new ForbiddenException('You only can remove ours answer');
    }

    return this.prisma.answer.delete({
      where: {
        id,
      },
    });
  }
}
