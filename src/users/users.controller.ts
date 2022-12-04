import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { JwtUtil } from '../auth/jwt.util';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtUtil: JwtUtil,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  @HttpCode(HttpStatus.OK)
  async me(@Headers('Authorization') auth: string) {
    const { username: userName } = await this.jwtUtil.decode(auth);
    const user = await this.usersService.getUser(userName);
    const { id, name, username } = user;
    return { id, name, username };
  }

  // Post / SignUp
  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  async addUser(
    @Body('name') name: string,
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    const salt = Number(10);
    const hashadPassword = await bcrypt.hash(password, salt);
    const result = await this.usersService.insertUser(
      name,
      username,
      hashadPassword,
    );

    if (!result?.id) {
      throw new HttpException('Gone', HttpStatus.GONE);
    }
    return {
      msg: 'User successfully registered',
      userId: result.id,
      userName: result.username,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/')
  @HttpCode(HttpStatus.RESET_CONTENT)
  async delete(@Headers('Authorization') auth: string): Promise<any> {
    const { id } = await this.jwtUtil.decode(auth);
    const isDeleted = await this.usersService.deleteUser(id);
    if (!isDeleted) {
      throw new HttpException('Not found!', HttpStatus.NOT_FOUND);
      return;
    }
    return {
      msg: 'Users successfully deleted!',
    };
  }
}
