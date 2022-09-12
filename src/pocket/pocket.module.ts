import { Module } from '@nestjs/common';
import { PocketController } from './pocket.controller';
import { PocketService } from './pocket.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PocketSchema } from '../models/pocket.model';
import { JwtUtil } from '../auth/jwt.util';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'pocket', schema: PocketSchema }]),
  ],
  controllers: [PocketController],
  providers: [PocketService, JwtUtil, JwtService],
  exports: [PocketService],
})
export class PocketModule {}
