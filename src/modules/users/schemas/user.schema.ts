import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";

export type UserDocument = User & mongoose.Document;

@Schema()
export class User {
  @Prop({ type: String })
  email: string;

  @Prop({ type: String })
  username: string;

  @Prop({ type: String })
  password: string;

  @Prop({ type: String })
  role: string;

  @Prop({ type: String })
  avatar_path: string;

  @Prop({ type: Date })
  created_at: Date;

  @Prop({ type: Date })
  updated_at: Date;

  @Prop({ type: Date })
  deleted_at: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
