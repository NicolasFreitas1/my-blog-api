import { ApiProperty } from '@nestjs/swagger';
import { Like, Post, PostTag, Tag } from '@prisma/client';

export class PostPresenterResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  authorId: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  likes: number;

  @ApiProperty()
  isLikedByCurrentUser: boolean;

  @ApiProperty()
  postTag: Tag[];

  @ApiProperty()
  excerpt: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

type PostTagsToTransform = PostTag & {
  tag: Tag;
};

export type PostToTransform = Post & {
  likes: Like[];
  postTags: PostTagsToTransform[];
};

export class PostPresenter {
  static toHTTP(
    post: PostToTransform,
    currentUser?: number,
  ): PostPresenterResponse {
    return {
      id: post.id,
      authorId: post.authorId,
      title: post.title,
      likes: post.likes.length,
      isLikedByCurrentUser: currentUser
        ? post.likes.map((like) => like.userId).includes(currentUser)
        : null,
      postTag: post.postTags.map((postTag) => postTag.tag),
      excerpt: post.content.substring(0, 80).trimEnd().concat('...'),
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    };
  }
}
