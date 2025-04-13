export interface IBaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}


export interface ICategory extends IBaseEntity {
  name?: string;
  description?: string;
  slug?: string;
  deletedAt?: Date | null;
  status?: string;
}
