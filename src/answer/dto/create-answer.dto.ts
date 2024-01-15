import { IsString, MaxLength } from 'class-validator';

export class CreateAnswerDto {
  /**
   * Conteúdo da  resposta
   * @example Conteúdo da resposta!
   */

  @IsString()
  @MaxLength(200)
  content: string;
}
