import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from 'src/enums/role.enum';

@Schema()
class User {
  @Prop({ required: true, type: 'string' })
  fullName: string;
  @Prop({ required: true, type: 'string', unique: true })
  email: string;
  @Prop({ required: true, type: 'string' })
  password: string;
  @Prop({ required: true, type: 'string' })
  phoneNumber: string;
  @Prop({ required: true, type: 'string' })
  creditCard: string;
  @Prop({ required: false, type: 'string' })
  token?: string;
  @Prop({ required: false, type: 'string' })
  loginDate: Date;
  @Prop({ required: false, type: 'string' })
  address: string;
  @Prop({ required: false, type: 'string', enum: Role })
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
