import {
    Table,
    Column,
    Model,
    DataType,
    CreatedAt,
    UpdatedAt,
    PrimaryKey,
    AutoIncrement,
    AllowNull,
    Unique,
  } from 'sequelize-typescript';
  
  @Table({
    tableName: 'users',
    timestamps: true,
  })
  export class User extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: number;
  
    @AllowNull(false)
    @Column(DataType.STRING)
    name!: string;
  
    @AllowNull(false)
    @Unique
    @Column(DataType.STRING)
    email!: string;
  
    @Column(DataType.STRING)
    phone?: string;
  
    @CreatedAt
    @Column(DataType.DATE)
    createdAt!: Date;
  
    @UpdatedAt
    @Column(DataType.DATE)
    updatedAt!: Date;
      password: string | undefined;
  }