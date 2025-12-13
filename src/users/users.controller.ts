import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.usersService.findAll(+page, +limit);
  }

  @Get('/profile/:id')
  findById(
    @Param('id') id: string,
    @Req() req
  ) {
    return this.usersService.findById(id);
  }

  @Patch('/edit/')
  updateById(
    @Body() updateUserDto: UpdateUserDto,
    @Req() req
  ) {
    return this.usersService.updateById(updateUserDto, req);
  }
}
