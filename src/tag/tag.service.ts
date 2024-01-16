import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TagEntity } from './entities/tag.entity';

@Injectable()
export class TagService {
  constructor(private prisma: PrismaService) {}

  findAll(): Promise<TagEntity[]> {
    return this.prisma.tag.findMany();
  }

  findOne(id: number): Promise<TagEntity> {
    return this.prisma.tag.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }
}
