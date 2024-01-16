import { Tag } from '@prisma/client';

export class TagEntity implements Tag {
  /**
   * Id da tag
   */
  id: number;

  /**
   * Nome da Tag
   */
  name: string;
}
