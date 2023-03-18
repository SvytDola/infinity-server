import {
  Table,
  Column,
  Model,
  Unique,
  IsEmail,
  DataType,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';
import { Gender } from '@shared/enum/gender';

@Table({ tableName: 'users' })
export class User extends Model<User> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Unique
  @IsEmail
  @Column
  email: string;

  @Column
  password: string;

  @Column({ type: DataType.STRING(20), allowNull: false })
  nickname: string;

  @CreatedAt
  @Column({ field: 'created_at' })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updated_at' })
  updatedAt: Date;

  @Column({ type: DataType.ENUM(Gender.female, Gender.male, Gender.gay) })
  gender: Gender;

  @Column(DataType.DATEONLY)
  birthday: string;
}
