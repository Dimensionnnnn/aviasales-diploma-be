import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/user/dto/user.dto';
import User from 'src/user/user.entity';
import { Repository } from 'typeorm';

export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getAllUsers() {
    return this.usersRepository.find();
  }

  async getUsersById(id: string) {
    const user = await this.usersRepository.findOneBy({ id });

    if (user) {
      return user;
    }

    throw new NotFoundException(`User with ID ${id} not found`);
  }

  async createUser(createUserDto: CreateUserDto) {
    const newUser = await this.usersRepository.create(createUserDto);
    await this.usersRepository.save({
      name: createUserDto.name,
      email: createUserDto.email,
      password: createUserDto.password,
    });

    return newUser;
  }

  async deleteById(id: string) {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      return null;
    }

    await this.usersRepository.remove(user);
    return user;
  }
}
