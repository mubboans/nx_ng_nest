import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { User } from '../../user/entities/user.entity';
@Table({
  tableName: 'Content',
  modelName: 'Content',
  timestamps: true,
  paranoid: true, // Enables soft deletes
})
export class Content extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: string;

  @BelongsTo(() => User)
  user: User;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  content: string;

  @Column({
    type: DataType.ENUM,
    values: ['draft', 'published', 'archived', 'scheduled'],
    defaultValue: 'published',
    allowNull: false,
  })
  status: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  publishedAt: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  scheduledFor: Date;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  slug: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  })
  allowComments: boolean;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
    allowNull: false,
  })
  viewsCount: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
    allowNull: false,
  })
  likesCount: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
    allowNull: false,
  })
  commentsCount: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
    allowNull: false,
  })
  sharesCount: number;

}
