import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { LocalAuthGuard } from 'src/auth/local.auth.guard';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Post / SignUp
  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  async addUser(
    @Body('name') name: string,
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    const salt = process.env.SALT;
    const hashadPassword = await bcrypt.hash(password, salt);
    const result = await this.usersService.insertUser(
      name,
      username,
      hashadPassword,
    );
    console.log(result);
    return {
      msg: 'User successfully registered',
      userId: result.id,
      userName: result.username,
    };
  }

  // Post / Login
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Request() req): Promise<any> {
    return {
      user: req.user,
      msg: 'User logged in!',
    };
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/protected')
  getHello(@Request() req): Promise<any> {
    return req.user;
  }

  @Get('/logout')
  logout(@Request() req): any {
    req.session.destroy();
    return {
      msg: 'The user session has ended',
    };
  }
}
