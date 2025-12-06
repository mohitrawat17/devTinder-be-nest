import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { Request } from 'express';
import { User } from 'src/users/users.model';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        @InjectModel(User) private userModel: typeof User,
        private jwtService: JwtService
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();
        // 💡 Adjust these paths to match your Nest routes if needed
        const publicPaths = ['/login', '/signup'];
        if (publicPaths.includes(req.path)) return true;

        try {
            const token = req.cookies.token
            if (!token) {
                throw new UnauthorizedException('Invalid token');
            }
            const payload = await this.jwtService.verifyAsync(
                token,
                {
                    secret: process.env.JWT_SECRET_KEY
                }
            );

            // Find user
            const user = await this.userModel.findByPk(payload.sub);
            if (!user) {
                throw new UnauthorizedException('No user found');
            }

            // 💡 We're assigning the user data to the req object here
            // so that we can access it in our route handlers
            const { password, ...safeUser } = user.toJSON(); user.dataValues
            req.user = safeUser
        } catch {
            throw new UnauthorizedException();
        }
        return true;
    }
}

