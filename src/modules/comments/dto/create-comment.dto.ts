import { Type } from 'class-transformer';
import {
  IsEmpty,
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsInt({ message: 'user_id định dạng phải là số' })
  @Type(() => Number)
  user_id: number;
  @IsNotEmpty()
  @IsInt({ message: 'room_id định dạng phải là số' })
  @Type(() => Number)
  room_id: number;
  content?: string;
  @Type(() => Number)
  @IsInt({ message: 'saoBinhLuan định dạng phải là số' })
  @Min(0)
  @Max(5)
  saoBinhLuan: number;
}
