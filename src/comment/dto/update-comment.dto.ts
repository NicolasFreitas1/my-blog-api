import { PartialType } from '@nestjs/swagger';
import { CreateCommentDto } from './create-comment.dto';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateCommentDto extends PartialType(CreateCommentDto) {
  /**
   * Conteúdo do comentário
   * @example Ótimas palavras!!! 👏👏👏
   */
  @IsOptional()
  @IsString()
  @MaxLength(100)
  content: string;
}
