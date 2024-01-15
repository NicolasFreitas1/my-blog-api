import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AnswerController } from './answer.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [AnswerController],
  providers: [PrismaService, AnswerService],
})
export class AnswerModule {}
