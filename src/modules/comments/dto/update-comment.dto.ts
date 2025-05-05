import { PartialType } from '@nestjs/swagger';
import { CreateCommentDto } from './create-comment.dto';
import { IsEmpty, IsInt, IsNotEmpty, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateCommentDto extends PartialType(CreateCommentDto) {
  @IsEmpty({ message: 'Không được phép cập nhật user_id' })
  user_id: any;

  @IsEmpty({ message: 'Không được phép cập nhật room_id' })
  room_id: any;
}
