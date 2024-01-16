import { ApiProperty } from '@nestjs/swagger';
import { Comment, Like, Post, PostTag, Tag } from '@prisma/client';

export class PostWithCommentsPresenterResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  authorId: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  likes: number;

  @ApiProperty()
  postTag: Tag[];

  @ApiProperty()
  excerpt: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  comments: Comment[];
}

type PostTagsToTransform = PostTag & {
  tag: Tag;
};

export type PostToTransform = Post & {
  comments: Comment[];
  likes: Like[];
  postTags: PostTagsToTransform[];
};

export class PostWithCommentsPresenter {
  static toHTTP(post: PostToTransform): PostWithCommentsPresenterResponse {
    return {
      id: post.id,
      authorId: post.authorId,
      title: post.title,
      likes: post.likes.length,
      postTag: post.postTags.map((postTag) => postTag.tag),
      excerpt: post.content.substring(0, 80).trimEnd().concat('...'),
      comments: post.comments,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    };
  }
}
