import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { CreatePostDto } from './create-post.dto';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  /**
   * Titulo da postagem
   * @example Meu blog!
   */
  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(50)
  title: string;

  /**
   * Conteúdo da postagem
   * @example Conteúdo do meu blog!
   */
  @IsOptional()
  @IsString()
  @MaxLength(200)
  content: string;
}
