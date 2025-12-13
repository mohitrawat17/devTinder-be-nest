import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User, UserAttributes } from './users.model';
import { UpdateUserDto } from './dto/update-user.dto';

interface AuthenticatedRequest extends Request {
    user: any;
}

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

    async findById(id: string) {
        const user = await this.userModel.findByPk(id, {
            attributes: { exclude: ['password'] },
        });

        if (!user) {
            throw new NotFoundException('No user found');
        }
        return user
    }

    async updateById(updateUserDto: UpdateUserDto, req: any) {
        const { id } = req.user

        const [updatedCount, rows] = await this.userModel.update(updateUserDto, {
            where: { id: id as any },
            returning: true,
            individualHooks: true,
        });

        if (updatedCount === 0) {
            throw new NotFoundException('User not found');
        }

        const updatedUser = rows[0];

        const { password, ...safeUser } = updatedUser.get({ plain: true });

        return { message: 'User updated successfully!', data: safeUser };
    }
}
