import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
class Admin {
  @Prop({ required: true, type: 'string' })
  fullName: string;
  @Prop({ required: true, type: 'string', unique: true })
  email: string;
  @Prop({ required: true, type: 'string' })
  hash: string;
  @Prop({ required: true, type: 'string' })
  phoneNumber: string;
  @Prop({ required: false, type: 'string' })
  token?: string;
  @Prop({ required: false, type: 'date' })
  loginDate?: Date;
  @Prop({ required: false, type: 'boolean', default: false })
  isDeleted?: boolean;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
