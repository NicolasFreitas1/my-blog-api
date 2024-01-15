import { Answer } from '@prisma/client';

export class AnswerEntity implements Answer {
  /**
   * Id da resposta a uma postagem
   */
  id: number;

  /**
   * Id do autor que criou a resposta
   */
  authorId: number;

  /**
   * Id da postagem referente a resposta
   */
  postId: number;

  /**
   * Conteudo da resposta
   */
  content: string;

  /**
   * Data de criação
   */
  createdAt: Date;

  /**
   * Data de modificação
   */
  updatedAt: Date;

  constructor(partial: Partial<AnswerEntity>) {
    Object.assign(this, partial);
  }
}
