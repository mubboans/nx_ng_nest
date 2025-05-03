// models/user.model.ts
import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'users',
  timestamps: true,
  paranoid: true, // Enables soft deletes
})
export class User extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  username: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    validate: {
      is: /^[6-9][0-9]{9}$/,   // 👈 Starts with 6-9 and has exactly 10 digits
      isNumeric: true,
      len: [10, 10],            // 👈 Exactly 10 characters
    }
  })
  contact: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  bio: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  profilePicture: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  coverPhoto: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  dateOfBirth: Date;

  @Column({
    type: DataType.ENUM,
    values: ['male', 'female', 'other', 'prefer_not_to_say'],
    allowNull: true,
  })
  gender: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  location: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  website: string;

  @Column({
    type: DataType.JSON,
    allowNull: true,
    defaultValue: {},
  })
  socialLinks: object; // For storing links to other social media profiles

  @Column({
    type: DataType.ENUM,
    values: ['user', 'creator', 'moderator', 'admin'],
    defaultValue: 'user',
    allowNull: false,
  })
  role: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  })
  isEmailVerified: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  })
  isPhoneVerified: boolean;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  emailVerifiedAt: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  phoneVerifiedAt: Date;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  authToken: string; // JWT token for authenticated sessions

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  authTokenExpiry: Date;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  })
  isActive: boolean;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  lastLogin: Date;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  lastLoginIp: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  deviceInfo: string; // Store device information


}
