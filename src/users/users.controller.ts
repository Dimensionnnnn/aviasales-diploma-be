import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import User from 'src/user/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from 'src/user/dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async getlAllUsers(): Promise<User[]> {
    return await this.usersService.getAllUsers();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async getUsersById(@Param('id') id: string): Promise<User> {
    return await this.usersService.getUsersById(Number(id));
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.createUser(createUserDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':id')
  async DeleteQueryBuilder(@Param('id') id: string): Promise<User | null> {
    return this.usersService.deleteById(Number(id));
  }
}
