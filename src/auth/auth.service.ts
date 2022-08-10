import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async validateUser(username: string, password: string) {
    try {
      const user = await this.userService.getUser(username);
      const passwordValid = await bcrypt.compare(password, user.password);
      if (!user) {
        throw new NotAcceptableException('could not find the user');
      }
      if (user && passwordValid) {
        return {
          id: user.id,
          username: user.username,
        };
      }
      return null;
    } catch (error) {
      return error;
    }
  }
}
