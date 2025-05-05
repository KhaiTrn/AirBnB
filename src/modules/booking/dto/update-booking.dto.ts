import { ApiHideProperty, ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateBookingDto } from './create-booking.dto';
import { IsDateString, IsEmpty, IsInt, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateBookingDto {
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

  @ApiProperty({ enum: ['PENDING', 'CONFIRMED', 'CANCELLED'] })
  status?: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
}
