// src/modules/otp/otp.model.ts
import { Table, Column, Model, DataType, CreatedAt, UpdatedAt } from 'sequelize-typescript';

@Table({
  tableName: 'otps',
  timestamps: true,
})

export class OTP extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  otp: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  isVerified: boolean;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  expiresAt: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    defaultValue: new Date(),
  })
  lastAttempt: Date;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  attemptCount: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  otp_type: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
