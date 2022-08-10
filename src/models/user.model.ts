import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Pocket } from './pocket.model';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ unique: true })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pocket',
    required: false,
  })
  pocket: Pocket[];
}

export const UserSchema = SchemaFactory.createForClass(User);
