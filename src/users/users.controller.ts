import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import User from 'src/user/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from 'src/user/dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getlAllUsers(): Promise<User[]> {
    const users = await this.usersService.getAllUsers();
    return users;
  }

  @Get(':id')
  async getUsersById(@Param('id') id: string): Promise<User> {
    const user = await this.usersService.getUsersById(Number(id));
    return user;
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createUser(@Body() createUserDto: CreateUserDto) {
    const newUser = await this.usersService.createUser(createUserDto);
    return newUser;
  }

  @Delete(':id')
  async DeleteQueryBuilder(@Param('id') id: string): Promise<User | null> {
    const user = this.usersService.deleteById(Number(id));
    return user;
  }
}
