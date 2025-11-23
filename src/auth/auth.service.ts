// src/auth/auth.service.ts
import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
// import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/users.model';

@Injectable()
export class AuthService {
  private readonly oneDayMs = 24 * 60 * 60 * 1000;

  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
    private readonly jwtService: JwtService,
  ) {}

  private omitPassword(user: User) {
    const plain = user.get({ plain: true }) as any;
    delete plain.password;
    return plain;
  }

  async signup(createUserDto: CreateUserDto) {
    const { emailId, password } = createUserDto;

    // check if user already exists
    const existing = await this.userModel.findOne({ where: { emailId } });
    if (existing) {
      throw new BadRequestException('Email Id already registered.');
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return this.omitPassword(user);
  }

//   async validateUser(emailId: string, password: string): Promise<User> {
//     const user = await this.userModel.findOne({ where: { emailId } });
//     if (!user) {
//       throw new UnauthorizedException('Invalid credentials');
//     }

//     const isValid = await bcrypt.compare(password, user.password);
//     if (!isValid) {
//       throw new UnauthorizedException('Invalid credentials');
//     }

//     return user;
//   }

//   async login(loginDto: LoginDto) {
//     const { emailId, password } = loginDto;
//     const user = await this.validateUser(emailId, password);

//     const payload = { sub: user.id, emailId: user.emailId };

//     const token = await this.jwtService.signAsync(payload, {
//       // optional: override options here or configure globally in JwtModule
//       expiresIn: '1d',
//     });

//     return {
//       message: 'Logged in successfully!',
//       token,
//       user: this.omitPassword(user),
//     };
//   }
}
