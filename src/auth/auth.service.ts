import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import User from 'src/user/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { AuthUserResponseType } from 'src/user/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<AuthUserResponseType> {
    const { name, email, password } = signUpDto;

    const existingUser = await this.usersRepository.findOneBy({ email });
    if (existingUser) {
      throw new HttpException(
        'Пользователь с таким email уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    this.usersRepository.save(user);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token: this.jwtService.sign({ id: user.id }),
    };
  }

  async login(loginDto: LoginDto): Promise<AuthUserResponseType> {
    const { email, password } = loginDto;

    const user = await this.usersRepository.findOneBy({ email });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token: this.jwtService.sign({ id: user.id }),
    };
  }
}
