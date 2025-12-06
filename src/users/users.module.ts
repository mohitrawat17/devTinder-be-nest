import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';
import { AuthGuard } from 'src/auth/auth.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([User]),
  SequelizeModule.forFeature([User]),
  JwtModule.register({
    secret: process.env.JWT_SECRET_KEY,
    signOptions: { expiresIn: '1d' },
  }),
  ],
  controllers: [UsersController],
  providers: [UsersService, AuthGuard],
  exports: [SequelizeModule.forFeature([User]), AuthGuard]
})
export class UsersModule { }
