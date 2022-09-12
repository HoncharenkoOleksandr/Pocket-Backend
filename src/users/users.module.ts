import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserSchema } from '../models/user.model';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtUtil } from '../auth/jwt.util';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'user', schema: UserSchema }])],
  providers: [UsersService, JwtUtil, JwtService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
