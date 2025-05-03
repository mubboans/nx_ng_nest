export class CreateContentDto {
  title: string;
  description: string;
  content: string;
  authorId: number;
  categoryId: number;
  tags: string[];
  status: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
}
