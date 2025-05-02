import { PartialType } from '@nestjs/mapped-types';
import { CreateLocationDto } from './create-location.dto';

export class UpdateLocationDto extends PartialType(CreateLocationDto) {
  tenViTri: string;
  tinhThanh: string;
  quocGia: string;
  hinhAnh?: string | undefined;
}
