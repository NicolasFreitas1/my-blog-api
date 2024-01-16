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
  postId: number | null;
  /**
   * Id do usuário que fez o comentário
   */
  authorId: number;

  /**
   * Id do comentário pai
   */
  parentCommentId: number | null;
  /**
   * Data que foi feito o comentário
   */
  createdAt: Date;
  /**
   * Data que foi editado o comentário
   */
  updatedAt: Date;
}
