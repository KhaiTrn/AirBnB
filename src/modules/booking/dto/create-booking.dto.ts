import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDateString, IsInt, IsNotEmpty, IsPositive } from 'class-validator';

export class CreateBookingDto {
  @Type(() => Number)
  @IsPositive()
  @IsInt()
  room_id: number;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    example: '2025-05-10T14:00:00Z',
  })
  @IsDateString()
  @IsNotEmpty()
  ngayDen: string;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    example: '2025-05-10T14:00:00Z',
  })
  @IsDateString()
  @IsNotEmpty()
  ngayDi: string;
  @Type(() => Number)
  @IsInt()
  soLuongKhach?: number;
  @IsNotEmpty({ message: 'trường user_id phải có' })
  @Type(() => Number)
  @IsInt()
  user_id: number;
  @ApiProperty({ enum: ['PENDING', 'CONFIRMED', 'CANCELLED'] })
  status?: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
}
