import { Module } from '@nestjs/common';
import { PocketController } from './pocket.controller';
import { PocketService } from './pocket.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PocketSchema } from '../models/pocket.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'pocket', schema: PocketSchema }]),
  ],
  controllers: [PocketController],
  providers: [PocketService],
  exports: [PocketService],
})
export class PocketModule {}
