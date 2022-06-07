import { IsString } from 'class-validator';

export class updateOrderDto {
  @IsString()
  address: string;
}
