import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserDocument } from '../models/user.model';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username, password) {
    try {
      const user = await this.usersService.getUser(username);
      const validPassword = await bcrypt.compare(password, user.password);
      if (user && validPassword) {
        const payload = {
          username: user.username,
          name: user.name,
          id: user.id,
        };
        return payload;
      }
      return null;
    } catch (e) {
      console.log(e);
      return 'Server side error';
    }
  }

  async login(user: UserDocument) {
    const payload = { username: user.username, id: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
