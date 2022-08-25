import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserSchema } from '../models/user.model';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from '../auth/auth.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'user', schema: UserSchema }])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
