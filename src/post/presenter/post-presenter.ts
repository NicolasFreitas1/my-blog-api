import { ApiProperty } from '@nestjs/swagger';
import { Post } from '@prisma/client';

export class PostPresenterResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  authorId: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  excerpt: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class PostPresenter {
  static toHTTP(post: Post): PostPresenterResponse {
    return {
      id: post.id,
      authorId: post.authorId,
      title: post.title,
      excerpt: post.content.substring(0, 120).trimEnd().concat('...'),
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    };
  }
}
