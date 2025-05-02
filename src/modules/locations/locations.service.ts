import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

import { PrismaService } from '../prisma/prisma.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
@Injectable()
export class LocationsService {
  constructor(
    private prisma: PrismaService,
    private cloudinary: CloudinaryService,
  ) {}
  async findAll() {
    const locations = await this.prisma.locations.findMany();

    return locations;
  }

  async create(createLocationDto: CreateLocationDto) {
    let { tenViTri, tinhThanh, quocGia, hinhAnh } = createLocationDto;
    hinhAnh = hinhAnh || '';

    const location = await this.prisma.locations.create({
      data: { tenViTri, tinhThanh, quocGia, hinhAnh: hinhAnh },
    });
    return location;
  }

  async findBySearch(query: any) {
    let { page, pageSize, search } = query;
    page = +page > 0 ? +page : 1;
    pageSize = +pageSize > 0 ? +pageSize : 10;
    search = search || '';
    const skip = (page - 1) * pageSize;
    const where = search.trim() !== '' ? { contains: search } : {};
    const totalItem = await this.prisma.locations.count({
      where: { tenViTri: where },
    });
    const totalPage = Math.ceil(totalItem / pageSize);
    const items = await this.prisma.locations.findMany({
      take: pageSize,
      skip: skip,
      where: { tenViTri: where },
    });
    return {
      pageIndex: page,
      pageSize,
      totalItem,
      totalPage,
      keyword: search,
      data: items || [],
    };
  }

  async findOne(id: number) {
    const location = await this.prisma.locations.findUnique({
      where: { location_id: id },
    });
    if (!location) throw new NotFoundException('không tìm thấy vị trí');
    return location;
  }

  async update(id: number, updateLocationDto: UpdateLocationDto) {
    let { tenViTri, tinhThanh, quocGia, hinhAnh } = updateLocationDto;
    hinhAnh = hinhAnh || '';
    try {
      const updatedData: any = {
        tenViTri,
        tinhThanh,
        quocGia,
        hinhAnh,
      };
      return await this.prisma.locations.update({
        where: { location_id: id },
        data: updatedData,
      });
    } catch (error) {
      if ((error.code = 'P2025'))
        throw new NotFoundException('Không tìm thấy vị trí update');
    }
  }

  async remove(id: number) {
    if (!id) throw new BadRequestException('Vui lòng cấp id để xóa');
    try {
      const locationDelete = await this.prisma.locations.delete({
        where: { location_id: id },
      });
      return locationDelete;
    } catch (error) {
      if (error.code === 'P2025')
        throw new NotFoundException('Không tìm thấy vị trí cần xóa');
    }
  }
  async uploadImg(maViTri: number, file: any) {
    if (!file)
      throw new BadRequestException(
        'Vui lòng cung cấp hình ảnh đúng định dạng',
      );
    try {
      const uploadResult: any = await this.cloudinary.uploadImage(
        file,
        'locations',
      );
      const result = await this.prisma.locations.update({
        where: { location_id: maViTri },
        data: {
          hinhAnh: uploadResult.secure_url,
        },
      });
      return result;
    } catch (error) {
      if (error.code === 'P2025')
        throw new NotFoundException('Không tìm thấy vị trí cần upload');
    }
  }
}
