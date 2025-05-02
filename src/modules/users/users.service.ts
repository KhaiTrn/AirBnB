import { BadRequestException, Injectable, Req } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { v2 as cloudinary } from 'cloudinary';
import {
  API_KEY,
  API_SECRET,
  CLOUD_NAME,
} from 'src/common/constant/app.constant';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private cloudinary: CloudinaryService,
  ) {}
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
  async uploadAvatar(req: any, file: any) {
    const { user } = req;
    console.log(user);
    if (!file) throw new BadRequestException('không có file để upload');
    //configuration
    console.log(file);
    const uploadAvatar: any = await this.cloudinary.uploadImage(file, 'avatar');

    const userUpdate = this.prisma.users.update({
      where: { user_id: user.user_id },
      data: {
        avatar: uploadAvatar.secure_url,
      },
    });
    return userUpdate;
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

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { email, password, userName, birth_day, phone } = updateUserDto;
    if (!id) throw new BadRequestException('không có id để update');
    const date = birth_day ? new Date(birth_day) : undefined;
    const hashPassword = await bcrypt.hash(password, 10);
    const updateUser = this.prisma.users.update({
      where: { user_id: id },
      data: {
        email,
        password: hashPassword,
        userName,
        birth_day: date,
        phone,
      },
    });
    return updateUser;
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
