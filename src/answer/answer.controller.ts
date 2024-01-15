import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { AnswerService } from './answer.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards';
import { UserInfo } from '../auth/decorators';
import { User } from '@prisma/client';
import { UserEntity } from '../user/entities/user.entity';

@Controller('answer')
@ApiTags('Answer')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Post(':postId')
  create(
    @UserInfo() currentUser: UserEntity,
    @Param('postId', ParseIntPipe) postId: number,
    @Body() createAnswerDto: CreateAnswerDto,
  ) {
    return this.answerService.create(currentUser.id, postId, createAnswerDto);
  }

  @Get(':postId')
  findAll(@Param('postId', ParseIntPipe) postId: number) {
    return this.answerService.findAll(postId);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.answerService.findOne(id);
  }

  @Patch(':id')
  async update(
    @UserInfo() currentUser: UserEntity,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAnswerDto: UpdateAnswerDto,
  ) {
    return await this.answerService.update(id, currentUser.id, updateAnswerDto);
  }

  @Delete(':id')
  async remove(
    @UserInfo() currentUser: UserEntity,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.answerService.remove(id, currentUser.id);
  }
}
