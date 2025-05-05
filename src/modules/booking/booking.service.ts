import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BookingService {
  constructor(private prisma: PrismaService) {}
  async findAll() {
    const allBooking = await this.prisma.booking.findMany();
    return allBooking;
  }

  async create(createBookingDto: CreateBookingDto) {
    const { room_id, ngayDen, ngayDi, soLuongKhach, user_id } =
      createBookingDto;
    const overLapping = await this.prisma.booking.findFirst({
      where: {
        room_id: room_id,
        status: { in: ['PENDING', 'CONFIRMED'] },
        AND: [{ ngayDen: { lt: ngayDi } }, { ngayDi: { gt: ngayDen } }],
      },
    });

    if (overLapping)
      throw new BadRequestException(
        'phòng đã có người đặt trong khoảng thời gian này',
      );
    try {
      const bookingNew = await this.prisma.booking.create({
        data: { room_id, ngayDen, ngayDi, soLuongKhach, user_id },
      });
      return bookingNew;
    } catch (error) {
      console.log(error);
    }
  }

  async findOne(id: number) {
    const isBooking = await this.prisma.booking.findFirst({
      where: { booking_id: id },
    });
    if (!isBooking) throw new NotFoundException('không tìm thấy booking này');
    const booking = await this.prisma.booking.findUnique({
      where: { booking_id: id },
    });

    return booking;
  }

  async update(id: number, updateBookingDto: UpdateBookingDto) {
    const isBooking = await this.prisma.booking.findUnique({
      where: { booking_id: id },
    });
    if (!isBooking) throw new NotFoundException('không tìm thấy đặt phòng này');
    const bookingUpdate = await this.prisma.booking.update({
      where: { booking_id: id },
      data: updateBookingDto,
    });
    return bookingUpdate;
  }

  async remove(id: number) {
    const isBooking = await this.prisma.booking.findFirst({
      where: { booking_id: id },
    });
    if (!isBooking) throw new NotFoundException('không tìm thấy đặt phòng này');
    await this.prisma.booking.delete({
      where: { booking_id: id },
    });
    return `This action removes a #${id} booking`;
  }
  async getByUserID(query: any) {
    let { search, pageIndex, pageSize } = query;
    pageIndex = +pageIndex > 0 ? +pageIndex : 1;
    pageSize = +pageSize > 0 ? +pageSize : 10;
    const skip = (pageIndex - 1) * pageSize;
    const take = pageSize;
    search = search || '';

    const where = {
      users: {
        OR: [{ email: { contains: search } }, { phone: { contains: search } }],
      },
    };
    const totalItem = await this.prisma.booking.count({
      where,
    });
    const totalPage = Math.ceil(totalItem / pageSize);
    const rooms = await this.prisma.booking.findMany({
      where,
      take,
      skip,
      include: {
        users: { select: { user_id: true, email: true, phone: true } },
      },
    });
    return { pageIndex, pageSize, totalItem, totalPage, items: rooms || [] };
  }
}
