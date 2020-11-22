import { Table, Column, Model, AutoIncrement, PrimaryKey } from 'sequelize-typescript';
import { UserRole } from '../enums';

@Table
export class User extends Model<User> {
    @AutoIncrement
    @PrimaryKey
    @Column
    public id: number;

    @Column
    public name: string;
    
    @Column
    public email: string;
    
    @Column
    public password: string;

    @Column
    public role: UserRole;
}