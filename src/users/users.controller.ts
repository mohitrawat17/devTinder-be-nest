import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

@Controller('users')
export class UsersController {
    @Get()
    findAll(@Query('page') page: number, @Query('limit') limit: number,@Query('role') role?: 'admin' | 'user') {
        return {page,limit};
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return { id }
    }

    @Post()
    createUser(@Body() user: {}) {
        return { user }
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() user: {}) {
        return { id, user }
    }

    @Delete(':id')
    deleteUser(@Param('id') id: string) {
        return { id }
    }

}
