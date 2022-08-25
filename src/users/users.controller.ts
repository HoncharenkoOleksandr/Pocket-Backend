import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/me/:username')
  @HttpCode(HttpStatus.OK)
  async me(@Param() param) {
    if (!param.username) {
      return {
        msg: 'Username is required',
      };
    }
    const user = await this.usersService.getUser(param.username);
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
    const salt = Number(process.env.SALT);
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
  @Delete(':id')
  @HttpCode(HttpStatus.RESET_CONTENT)
  async delete(@Param('id') id: string): Promise<any> {
    const isDeleted = await this.usersService.deleteUser(id);
    return isDeleted
      ? {
          msg: 'Users successfully deleted!',
        }
      : {
          msg: 'Error!',
        };
  }
}
