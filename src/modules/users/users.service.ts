import { BadRequestException, Injectable, Req } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto, file: any, req: any) {
    let { email, password, userName, role_id, birth_day, phone, gender } =
      createUserDto;
    const isUser = await this.prisma.users.findFirst({
      where: { email: email },
    });
    const host = req.get('host');
    const protocol = req.protocol;
    const imageUrl = `${protocol}://${host}/upload/${file.filename}`;
    if (isUser) throw new BadRequestException('user is exist');
    const hashPassword = await bcrypt.hash(password, 10);
    const date = birth_day !== undefined ? new Date(birth_day) : undefined;

    const newUser = await this.prisma.users.create({
      data: {
        email,
        password: hashPassword,
        userName: userName,
        role_id: +role_id,
        birth_day: date,
        phone: phone,
        gender: gender,
        avatar: imageUrl,
      },
    });
    return newUser;
  }

  async findAll() {
    const users = await this.prisma.users.findMany();
    const usersExpect = users.map(
      ({ password, google_id, face_app_id, ...rest }) => rest,
    );

    return usersExpect;
  }
  findOne(id: number) {
    const user = this.prisma.users.findUnique({
      where: { user_id: id },
    });
    if (!user) throw new BadRequestException('không tìm thấy user');
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    if (!id) throw new BadRequestException('không có id để xóa');
    const isUser = await this.prisma.users.findUnique({
      where: { user_id: id },
    });
    if (!isUser) throw new BadRequestException('không có user để xóa');
    await this.prisma.users.delete({ where: { user_id: id } });
    return `This action removes a #${id} user`;
  }
  async findBySearch(query: any) {
    let { page, pageSize, search } = query;
    page = +page > 0 ? +page : 1;
    pageSize = +pageSize > 0 ? +pageSize : 10;
    search = search || '';
    const where = search.trim() !== '' ? { contains: search } : {};
    const totalItem = await this.prisma.users.count({
      where: { email: where },
    });
    const totalPage = Math.ceil(totalItem / pageSize);
    const skip = (page - 1) * pageSize;
    const users = await this.prisma.users.findMany({
      take: pageSize,
      skip: skip,
      where: { email: where },
    });
    return {
      page,
      pageSize,
      totalPage,
      totalItem,
      users: users || [],
    };
  }
}
