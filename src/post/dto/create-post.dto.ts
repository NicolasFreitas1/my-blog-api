import { IsArray, IsString, MaxLength } from 'class-validator';

export class CreatePostDto {
  /**
   * Titulo da postagem
   * @example Meu blog!
   */
  @IsString()
  @MaxLength(50)
  title: string;

  /**
   * Conteúdo da postagem
   * @example Conteúdo do meu blog!
   */

  @IsString()
  @MaxLength(200)
  content: string;

  /**
   * Id das Tags que a postagem pertence
   * @example [1, 2, 3]
   */
  @IsArray()
  tagIds: number[];
}
