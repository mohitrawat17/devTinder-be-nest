import {
    Table,
    Column,
    Model,
    DataType,
    Unique,
    AllowNull,
} from 'sequelize-typescript';
import { Gender } from 'src/auth/auth.enums';
import { Optional } from 'sequelize';

// 1) Attributes that exist in the DB / on the instance
export interface UserAttributes {
    firstName: string;
    lastName?: string | null;
    emailId: string;
    password: string;
    age?: number | null;
    gender?: Gender | null;
    photo?: string | null;
    skills?: string[] | null;
}

export type UserCreationAttributes = Optional<
    UserAttributes,
    'lastName' | 'age' | 'gender' | 'photo' | 'skills'
>;


@Table({
    tableName: 'users',
    timestamps: true,
})
export class User
    extends Model<UserAttributes, UserCreationAttributes>
    implements UserAttributes {

    @AllowNull(false)
    @Column({
        type: DataType.STRING(30),
    })
    firstName: string;

    @AllowNull(true)
    @Column({
        type: DataType.STRING(30),
    })
    lastName?: string;

    @AllowNull(false)
    @Unique
    @Column({
        type: DataType.STRING,
    })
    emailId: string;

    @AllowNull(false)
    @Column({
        type: DataType.STRING,
    })
    password: string;

    @AllowNull(true)
    @Column({
        type: DataType.INTEGER,
    })
    age?: number;

    @AllowNull(true)
    @Column({
        type: DataType.ENUM(...Object.values(Gender)),
    })
    gender?: Gender;

    @AllowNull(true)
    @Column({
        type: DataType.STRING,
    })
    photo?: string;

    @AllowNull(true)
    @Column({
        // Postgres
        type: DataType.ARRAY(DataType.STRING),
    })
    skills?: string[];
}
