import { IsString, MaxLength } from 'class-validator';

export class CreateCommentDto {
  /**
   * Conteúdo do comentário
   * @example Ótimas palavras!!! 👏👏👏
   */
  @IsString()
  @MaxLength(100)
  content: string;
}
