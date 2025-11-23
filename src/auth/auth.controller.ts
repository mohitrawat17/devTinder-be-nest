// src/auth/auth.controller.ts
import {
    Body,
    Controller,
    Post,
    Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
// import { LoginDto } from './dto/login.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    private readonly oneDayMs = 24 * 60 * 60 * 1000;

    constructor(private readonly authService: AuthService) { }

    @Post('signup')
    async signup(@Body() createUserDto: CreateUserDto) {
        // Validation is handled by pipes using class-validator decorators
        const user = await this.authService.signup(createUserDto);
        return user;
    }

    //   @Post('login')
    //   async login(
    //     @Body() loginDto: LoginDto,
    //     @Res({ passthrough: true }) res: Response,
    //   ) {
    //     const { token, user, message } = await this.authService.login(loginDto);

    //     // same cookie-style as your Express code
    //     res.cookie('token', token, {
    //       httpOnly: true,
    //       maxAge: this.oneDayMs,
    //     });

    //     return { message, user };
    //   }
}
