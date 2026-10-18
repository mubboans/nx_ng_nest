import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'car_models',
  timestamps: true,
  paranoid: true, // soft deletes
})
export class CarModel extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, allowNull: true })
  tagline: string;

  @Column({ type: DataType.STRING, allowNull: true })
  category: string; // e.g. Hypercar, Luxury GT, SUV

  @Column({ type: DataType.STRING, allowNull: true })
  hp: string;

  @Column({ type: DataType.STRING, allowNull: true })
  acceleration: string;

  @Column({ type: DataType.STRING, allowNull: true })
  topSpeed: string;

  @Column({ type: DataType.STRING, allowNull: true })
  range: string;

  @Column({ type: DataType.STRING, allowNull: true })
  price: string;

  @Column({ type: DataType.STRING, allowNull: true })
  color: string; // Hex background color for the card

  @Column({ type: DataType.STRING, allowNull: true })
  image: string; // URL / relative path to car image

  @Column({ type: DataType.TEXT, allowNull: true })
  description: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  })
  isActive: boolean;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  sortOrder: number;
}
