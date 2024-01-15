import { Comment } from '@prisma/client';

export class CommentEntity implements Comment {
  /**
   * Id do comentário
   */
  id: number;
  /**
   * Conteúdo do comentário
   */
  content: string;
  /**
   * Id do post relacionado
   */
  postId: number;
  /**
   * Id do usuário que fez o comentário
   */
  authorId: number;

  /**
   * Id da resosta
   */
  answerId: number;
  /**
   * Data que foi feito o comentário
   */
  createdAt: Date;
  /**
   * Data que foi editado o comentário
   */
  updatedAt: Date;
}
