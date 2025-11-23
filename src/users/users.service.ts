import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User) 
        private userModel: typeof User,
    ) { }

    async findAll(page: number, limit: number) {
        const offset = (page - 1) * limit;
        const data = await this.userModel.findAndCountAll({
            limit,
            offset,
        });

        return data
    }
}
