import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class RoomsService {
  constructor(
    private prisma: PrismaService,
    private cloudinary: CloudinaryService,
  ) {}
  async findAll() {
    const rooms = await this.prisma.rooms.findMany();
    return rooms;
  }

  async create(createRoomDto: CreateRoomDto, req: any) {
    let {
      tenPhong,
      khach,
      phongNgu,
      giuong,
      phongTam,
      description,
      giaTien,
      mayGiat,
      banLa,
      tivi,
      dieuHoa,
      wifi,
      bep,
      doXe,
      hoBoi,
      banUi,
      location_id,
      hinhAnh,
    } = createRoomDto;
    description = description || '';
    const { user } = req;
    hinhAnh = hinhAnh || '';

    const dataUpload: any = {
      user_id: user.user_id,
      tenPhong,
      khach,
      phongNgu,
      giuong,
      phongTam,
      description,
      giaTien,
      mayGiat,
      banLa,
      tivi,
      dieuHoa,
      wifi,
      bep,
      doXe,
      hoBoi,
      banUi,
      location_id,
      hinhAnh: hinhAnh,
    };

    const result = await this.prisma.rooms.create({
      data: dataUpload,
    });
    console.log(result);
    return result;
  }

  async findByLocation(maViTri: number) {
    const rooms = await this.prisma.rooms.findMany({
      where: { location_id: +maViTri },
    });
    return rooms || [];
  }
  async findBySearch(query: any) {
    let { pageIndex, pageSize, keyword } = query;
    pageIndex = +pageIndex > 0 ? +pageIndex : 1;
    pageSize = +pageSize > 0 ? +pageSize : 10;

    const keywords = keyword ? `tenPhong LIKE N'%${keyword}%` : null;
    const skip = (pageIndex - 1) * pageSize;
    const where = keyword && keyword.trim() !== '' ? { contains: keyword } : {};
    const totalItem = await this.prisma.rooms.count({
      where: { tenPhong: where },
    });
    const totalRow = Math.ceil(totalItem / pageSize);
    const items = await this.prisma.rooms.findMany({
      take: pageSize,
      skip: skip,
      where: { tenPhong: where },
    });
    return {
      pageIndex,
      pageSize,
      totalItem,
      totalRow,
      keywords,
      items: items || [],
    };
  }
  async findOne(id: number) {
    const room = await this.prisma.rooms.findUnique({
      where: { room_id: id },
    });
    if (!room) throw new NotFoundException('không có tài nguyên');
    return room;
  }

  async update(id: number, updateRoomDto: UpdateRoomDto) {
    let {
      tenPhong,
      khach,
      phongNgu,
      giuong,
      phongTam,
      description,
      giaTien,
      mayGiat,
      banLa,
      tivi,
      dieuHoa,
      wifi,
      bep,
      doXe,
      hoBoi,
      banUi,
      location_id,
      hinhAnh,
    } = updateRoomDto;
    const isRoomExist = await this.prisma.rooms.findFirst({
      where: { room_id: id },
    });
    if (!isRoomExist) throw new NotFoundException('Không tìm thấy tài nguyên');
    const RoomUpdate = await this.prisma.rooms.update({
      where: { room_id: +id },
      data: updateRoomDto,
    });
    return RoomUpdate;
  }

  async remove(id: number) {
    try {
      await this.prisma.rooms.delete({
        where: { room_id: +id },
      });

      return `This action removes a #${id} room`;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Không tìm thấy tài nguyên để xóa');
      }
    }
  }
  async uploadImage(file: any, maPhong: number) {
    if (!file)
      throw new BadRequestException('Vui lòng cung cấp file để upload');
    try {
      const uploadImg: any = await this.cloudinary.uploadImage(file, 'rooms');
      const roomUpload = await this.prisma.rooms.update({
        where: { room_id: maPhong },
        data: { hinhAnh: uploadImg.secure_url },
      });
      return roomUpload;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(
          'không tìm thấy phòng để up hình vui lòng nhập mã phòng chính xác',
        );
      }
    }
  }
}
