import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type PocketDocument = Pocket & Document;

@Schema()
export class Pocket {
  @Prop({ unique: true })
  id: string;

  @Prop({ required: true })
  owner: string;

  @Prop()
  name: string;

  @Prop({ required: true })
  link: string;

  @Prop()
  createdAt: Date;
}

export const PocketSchema = SchemaFactory.createForClass(Pocket);
