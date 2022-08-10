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
  Request,
  Session,
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
    const salt = Number(process.env.SALT);
    const hashadPassword = await bcrypt.hash(password, salt);
    const result = await this.usersService.insertUser(
      name,
      username,
      hashadPassword,
    );
    console.log(result);
    if (!result?.id) {
      throw new HttpException('Gone', HttpStatus.GONE);
    }
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

  @Get('/logout')
  logout(@Session() session): any {
    session.destroy();
    return {
      msg: 'The user session has ended',
    };
  }

  @UseGuards(AuthenticatedGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.RESET_CONTENT)
  async delete(@Param('id') id: string, @Session() session: any): Promise<any> {
    const isDeleted = await this.usersService.deleteUser(id);
    session.destroy();
    console.log(isDeleted);
    return isDeleted
      ? {
          msg: 'Users successfully deleted!',
        }
      : {
          msg: 'Error!',
        };
  }
}
