import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = Document & User;
@Schema({ collection: 'users' })
export class User {
  @Prop()
  userId?: string;

  @Prop()
  nickname: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  confirm_password: string;

  @Prop()
  gender: string;

  @Prop()
  token: string | null;

  @Prop()
  google_login: boolean;

  @Prop()
  session_id: string;

  @Prop()
  create_time: Date;
}
export const userSchema = SchemaFactory.createForClass(User);
